<?php

add_action('wp_enqueue_scripts', 'load_scripts');

register_nav_menu('header', __('Header Menu'));
register_nav_menu('footer', __('Footer Menu'));
register_nav_menu('filter', __('Filter Menu'));

add_action('init', 'cl_rewrites_init');
function cl_rewrites_init()
{
    add_rewrite_rule(
        'people/([0-9A-Za-z-]+)/posts?$', 'index.php?pagename=person-posts&person_slug=$matches[1]', 'top'
    );

    add_rewrite_rule(
        'issues/([0-9A-Za-z-]+)/([0-9A-Za-z-]+)?$', 'index.php?pagename=issue-categories&issue_slug=$matches[1]&issue_category=$matches[2]', 'top'
    );
}

add_filter('query_vars', 'cl_query_vars');
function cl_query_vars($query_vars)
{

    $query_vars[] = 'person_slug';
    $query_vars[] = 'issue_slug';
    $query_vars[] = 'issue_category';
    return $query_vars;
}

function is_partial()
{

    if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
        && strtolower(
            $_SERVER['HTTP_X_REQUESTED_WITH']
        ) === 'xmlhttprequest'
    ) {
        return true;
    } else {
        return false;
    }
}

function load_scripts()
{

    wp_deregister_script('jquery');
    wp_enqueue_script('vendor', get_stylesheet_directory_uri() . '/vendor.js');

    if (ENVIRONMENT === "development") {
        wp_enqueue_script('app', get_stylesheet_directory_uri() . '/app.js');
    } else {
        wp_enqueue_script('app', get_stylesheet_directory_uri() . '/app.min.js');
    }
}

function get_post_content($id)
{

    $content_post = get_post($id);
    $content = $content_post->post_content;
    $content = apply_filters('the_content', $content);
    $content = str_replace(']]>', ']]&gt;', $content);
    return $content;
}

function page_id()
{

    global $wp_query;
    $page = '';
    if (is_front_page()) {
        $page = 'home';
    } elseif (is_page()) {
        $page = $wp_query->query_vars['pagename'];
    } elseif (is_category()) {
        $page = 'news-filtered';
    } elseif (is_archive()) {
        $page = $wp_query->query_vars['post_type'];
    } elseif (is_single()) {
        $post = $wp_query->post;
        $page = $post->post_name;
    } elseif (is_home()) {
        $page = 'news';
    }
    if ($page === null || $page === '') {
        $page = 'blog';
    }

    return $page;
}

function cl_body_class($class = '')
{

    global $wp_query;

    $classes = get_body_class($class);

    if (is_single()) {
        $classes[] = "detail";
        $post = $wp_query->post;
        $classes = array_merge($classes, get_post_categories_classes($post->ID));
    }

    return join(' ', $classes);
}

function get_post_categories_classes($id){
    $categories = wp_get_post_categories($id);
    $classes = [];
    foreach ($categories as $cat_id) {
        $category = get_category($cat_id);
        $classes[] = "category-" . $category->slug;
    }
    return $classes;
}

function does_person_have_posts($id){
    $person_posts = get_posts(
        array(
            'post_type'  => 'post',
            'posts_per_page' => -1,
            'meta_key' => 'person',
            'meta_value' => $id,
        )
    );

    if(!empty($person_posts)){
        return true;
    } else {
        return false;
    }

}


function container_start($id= ""  , $class = "" , $data="") {
    echo '<div id="container" class="container-fluid '.$class.'" '.$data.'>';
}

function container_close() {
    echo ' <div class="clear"></div></div>';
}



function show_gallery_item($item, $i) {
    set_query_var('item', $item);
    set_query_var('i', $i);
    get_template_part('gallery-item');
};

function show_gallery($gallery, $responsive_gallery = false, $transition_order = null, $transition_type = null, $transition_direction = null)
{
    set_query_var('transition_order' ,$transition_order );
    set_query_var('transition_type' ,$transition_type );
    set_query_var('transition_direction' ,$transition_direction );
    set_query_var('gallery', $gallery);
    set_query_var('responsive_gallery', $responsive_gallery);
    get_template_part('gallery');
}

function show_video($mp4, $webm)
{

    set_query_var('mp4', $mp4);
    set_query_var('webm', $webm);

    get_template_part('video');
}

function show_tile($tile)
{

    set_query_var('tile', $tile);
    get_template_part('partials/tile');
}

function set_image_registration($fields)
{

    //set image registration
    $image_registration = [];
    foreach (
        [
            'vertical',
            'horizontal'
        ] as $v
    ) {
        $v = !empty($fields["image_registration_{$v}"]) ? $fields["image_registration_{$v}"] : 'center';
        $v = "img-$v";
        if (!in_array($v, $image_registration)) {
            $image_registration[] = $v;
        }
    }

    usort(
        $image_registration, function ($a, $b) {

        if ($a == 'img-center') {
            return 0;
        }
        return ($a < $b) ? -1 : 1;
    }
    );

    $image_registration_class = implode(' ', $image_registration);
    return $image_registration_class;

}
//test
function prime_panel_fields($fields, $modifier = null)
{

    $return = [];

    //standardize panel fields
    foreach ($fields as $k => $v) {
        if (!empty($modifier)) {
            $needle = $modifier . '_';
            if (strpos($k, $needle) !== false) {
                $k = str_replace($needle, null, $k);
            }
        }
        $k = str_replace('panel_', null, $k);
        $return[$k] = $v;
    }

    return $return;
}

add_action('init', 'post_type_contact');
function post_type_contact()
{

    $labels = array(
        'name'               => _x('Contacts', 'post type general name'),
        'singular_name'      => _x('contact', 'post type singular name'),
        'add_new'            => _x('Add Contact', 'contacts'),
        'add_new_item'       => __('Add New Contact'),
        'edit_item'          => __('Edit Contact'),
        'new_item'           => __('New Contact'),
        'all_items'          => __('All Contacts'),
        'view_item'          => __('View Contact'),
        'search_items'       => __('Search Contacts'),
        'not_found'          => __('No Contacts found'),
        'not_found_in_trash' => __('No Contacts found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Contacts'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Contacts and Contact specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'contacts')
    );
    register_post_type('contacts', $args);
}

add_action('init', 'post_type_social');
function post_type_social()
{

    $labels = array(
        'name'               => _x('Social Links', 'post type general name'),
        'singular_name'      => _x('social link', 'post type singular name'),
        'add_new'            => _x('Add Social Link', 'social_links'),
        'add_new_item'       => __('Add New Social Link'),
        'edit_item'          => __('Edit Social Link'),
        'new_item'           => __('New Social Link'),
        'all_items'          => __('All Social Links'),
        'view_item'          => __('View Social Link'),
        'search_items'       => __('Search Social Links'),
        'not_found'          => __('No Social Links found'),
        'not_found_in_trash' => __('No Social Links found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Social Links'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Social Links and Social Link specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'social_links')
    );
    register_post_type('social_links', $args);
}

add_action('init', 'post_type_gallery_item');
function post_type_gallery_item()
{

    $labels = array(
        'name'               => _x('Gallery Items', 'post type general name'),
        'singular_name'      => _x('gallery_item', 'post type singular name'),
        'add_new'            => _x('Add Gallery Item', 'gallery_items'),
        'add_new_item'       => __('Add New Gallery Item'),
        'edit_item'          => __('Edit Gallery Item'),
        'new_item'           => __('New Gallery Item'),
        'all_items'          => __('All Gallery Items'),
        'view_item'          => __('View Gallery Item'),
        'search_items'       => __('Search Gallery Items'),
        'not_found'          => __('No Gallery Items found'),
        'not_found_in_trash' => __('No Gallery Items found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Gallery Items'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Gallery Items and Gallery Item specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'gallery_items')
    );
    register_post_type('gallery_item', $args);
}

add_action('init', 'post_type_gallery');
function post_type_gallery()
{

    $labels = array(
        'name'               => _x('Galleries', 'post type general name'),
        'singular_name'      => _x('gallery', 'post type singular name'),
        'add_new'            => _x('Add Gallery', 'gallery'),
        'add_new_item'       => __('Add New Gallery'),
        'edit_item'          => __('Edit Gallery'),
        'new_item'           => __('New Gallery'),
        'all_items'          => __('All Galleries'),
        'view_item'          => __('View Gallery'),
        'search_items'       => __('Search Galleries'),
        'not_found'          => __('No Galleries found'),
        'not_found_in_trash' => __('No Galleries found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Galleries'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Galleries and Gallery specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'galleries')
    );
    register_post_type('gallery', $args);
}



add_action('init', 'post_type_craft');
function post_type_craft()
{

    $labels = array(
        'name'               => _x('Crafts', 'post type general name'),
        'singular_name'      => _x('craft', 'post type singular name'),
        'add_new'            => _x('Add Craft', 'craft'),
        'add_new_item'       => __('Add New Craft'),
        'edit_item'          => __('Edit Craft'),
        'new_item'           => __('New Craft'),
        'all_items'          => __('All Crafts'),
        'view_item'          => __('View Craft'),
        'search_items'       => __('Search Crafts'),
        'not_found'          => __('No Crafts found'),
        'not_found_in_trash' => __('No Crafts found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Crafts'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Crafts and Craft specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'crafts')
    );
    register_post_type('craft', $args);
}

/*
 * Care Linklist Post
 * */


add_action('init', 'post_type_care');
function post_type_care()
{

    $labels = array(
        'name'               => _x('Cares', 'post type general name'),
        'singular_name'      => _x('Care', 'post type singular name'),
        'add_new'            => _x('Add Care', 'care'),
        'add_new_item'       => __('Add New Care'),
        'edit_item'          => __('Edit Care'),
        'new_item'           => __('New Care'),
        'all_items'          => __('All Cares'),
        'view_item'          => __('View Care'),
        'search_items'       => __('Search Cares'),
        'not_found'          => __('No Cares found'),
        'not_found_in_trash' => __('No Cares found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Cares'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Cares and Care specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'cares')
    );
    register_post_type('care', $args);
}


add_action('init', 'post_type_client');
function post_type_client()
{

    $labels = array(
        'name'               => _x('Clients', 'post type general name'),
        'singular_name'      => _x('client', 'post type singular name'),
        'add_new'            => _x('Add Client', 'client'),
        'add_new_item'       => __('Add New Client'),
        'edit_item'          => __('Edit Client'),
        'new_item'           => __('New Client'),
        'all_items'          => __('All Clients'),
        'view_item'          => __('View Client'),
        'search_items'       => __('Search Clients'),
        'not_found'          => __('No Clients found'),
        'not_found_in_trash' => __('No Clients found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Clients'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Client logos',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'clients')
    );
    register_post_type('client', $args);
}

add_action('init', 'post_type_career_openings');
function post_type_career_openings()
{

    $labels = array(
        'name'               => _x('Career Openings', 'post type general name'),
        'singular_name'      => _x('opening', 'post type singular name'),
        'add_new'            => _x('Add Opening', 'craft'),
        'add_new_item'       => __('Add New Opening'),
        'edit_item'          => __('Edit Opening'),
        'new_item'           => __('New Opening'),
        'all_items'          => __('All Openings'),
        'view_item'          => __('View Opening'),
        'search_items'       => __('Search Openings'),
        'not_found'          => __('No Openings found'),
        'not_found_in_trash' => __('No Openings found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Career Openings'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Career Openings and Opening specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'openings')
    );
    register_post_type('career-opening', $args);
}

add_action('init', 'post_type_wolfpack_descriptions');
function post_type_wolfpack_descriptions()
{

    $labels = array(
        'name'               => _x(
            'Wolf Pack Description', 'post type general name'
        ),
        'singular_name'      => _x('description', 'post type singular name'),
        'add_new'            => _x('Add Pack Description', 'craft'),
        'add_new_item'       => __('Add New Pack Description'),
        'edit_item'          => __('Edit Pack Description'),
        'new_item'           => __('New Pack Description'),
        'all_items'          => __('All Pack Descriptions'),
        'view_item'          => __('View Pack Description'),
        'search_items'       => __('Search Pack Descriptions'),
        'not_found'          => __('No Pack Descriptions found'),
        'not_found_in_trash' => __('No Pack Descriptions found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Pack Descriptions'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Pack Descriptions specific data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'pack_descriptions')
    );
    register_post_type('pack_descriptions', $args);
}

add_action('init', 'post_type_persons');
function post_type_persons()
{

    $labels = array(
        'name'               => _x('People', 'post type general name'),
        'singular_name'      => _x('person', 'post type singular name'),
        'add_new'            => _x('Add ', 'Person'),
        'add_new_item'       => __('Add New Person'),
        'edit_item'          => __('Edit Person'),
        'new_item'           => __('New Person'),
        'all_items'          => __('All People'),
        'view_item'          => __('View Person'),
        'search_items'       => __('Search People'),
        'not_found'          => __('No People found'),
        'not_found_in_trash' => __('No People found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'People'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our People data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'people')
    );
    register_post_type('person', $args);
}

add_action('init', 'post_type_work');
function post_type_work()
{

    $labels = array(
        'name'               => _x('Work', 'post type general name'),
        'singular_name'      => _x('work', 'post type singular name'),
        'add_new'            => _x('Add ', 'Work'),
        'add_new_item'       => __('Add New Work'),
        'edit_item'          => __('Edit Work'),
        'new_item'           => __('New Work'),
        'all_items'          => __('All Work'),
        'view_item'          => __('View Work'),
        'search_items'       => __('Search Work'),
        'not_found'          => __('No Work found'),
        'not_found_in_trash' => __('No Work found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Work'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Work data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'work')
    );
    register_post_type('work', $args);

}

add_action('init', 'post_type_work_layout_one_panel');
function post_type_work_layout_one_panel()
{

    $labels = array(
        'name'               => _x(
            'One Panel Layout', 'post type general name'
        ),
        'singular_name'      => _x(
            'One Panel Layout', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'One Panel Layout'),
        'add_new_item'       => __('Add New One Panel Layout'),
        'edit_item'          => __('Edit One Panel Layout'),
        'new_item'           => __('New One Panel Layout'),
        'all_items'          => __('All One Panel Layout'),
        'view_item'          => __('View One Panel Layout'),
        'search_items'       => __('Search One Panel Layout'),
        'not_found'          => __('No One Panel Layouts found'),
        'not_found_in_trash' => __('No One Panel Layouts found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'One Panel Layouts'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our One Panel Layout data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => null)
    );
    register_post_type('layout_one_panel', $args);
}

add_action('init', 'post_type_work_layout_two_panel');
function post_type_work_layout_two_panel()
{

    $labels = array(
        'name'               => _x(
            'Two Panel Layout', 'post type general name'
        ),
        'singular_name'      => _x(
            'Two Panel Layout', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'Two Panel Layout'),
        'add_new_item'       => __('Add New Two Panel Layout'),
        'edit_item'          => __('Edit Two Panel Layout'),
        'new_item'           => __('New Two Panel Layout'),
        'all_items'          => __('All Two Panel Layout'),
        'view_item'          => __('View Two Panel Layout'),
        'search_items'       => __('Search Two Panel Layout'),
        'not_found'          => __('No Two Panel Layouts found'),
        'not_found_in_trash' => __('No Two Panel Layouts found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Two Panel Layouts'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Two Panel Layout data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => null)
    );
    register_post_type('layout_two_panel', $args);
}

add_action('init', 'post_type_work_layout_three_panel');
function post_type_work_layout_three_panel()
{

    $labels = array(
        'name'               => _x(
            'Three Panel Layout', 'post type general name'
        ),
        'singular_name'      => _x(
            'Three Panel Layout', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'Three Panel Layout'),
        'add_new_item'       => __('Add New Three Panel Layout'),
        'edit_item'          => __('Edit Three Panel Layout'),
        'new_item'           => __('New Three Panel Layout'),
        'all_items'          => __('All Three Panel Layout'),
        'view_item'          => __('View Three Panel Layout'),
        'search_items'       => __('Search Three Panel Layout'),
        'not_found'          => __('No Three Panel Layouts found'),
        'not_found_in_trash' => __('No Three Panel Layouts found in the Trash'),
        'parent_item_colon'  => '',
        'menu_name'          => 'Three Panel Layouts'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Three Panel Layout data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => null)
    );
    register_post_type('layout_three_panel', $args);
}

add_action('init', 'post_type_work_layout_digital_screens');
function post_type_work_layout_digital_screens()
{

    $labels = array(
        'name'               => _x(
            'Digital Screens Layout', 'post type general name'
        ),
        'singular_name'      => _x(
            'Digital Screens Layout', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'Digital Screens Layout'),
        'add_new_item'       => __('Add New Digital Screens Layout'),
        'edit_item'          => __('Edit Digital Screens Layout'),
        'new_item'           => __('New Digital Screens Layout'),
        'all_items'          => __('All Digital Screens Layout'),
        'view_item'          => __('View Digital Screens Layout'),
        'search_items'       => __('Search Digital Screens Layout'),
        'not_found'          => __('No Digital Screens Layouts found'),
        'not_found_in_trash' => __(
            'No Digital Screens Layouts found in the Trash'
        ),
        'parent_item_colon'  => '',
        'menu_name'          => 'Digital Screens Layout'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Digital Screens Layout data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => null)
    );
    register_post_type('layout_digi_screen', $args);
}

add_action('init', 'post_type_work_layout_text');
function post_type_work_layout_text()
{

    $labels = array(
        'name'               => _x(
            'Text Layout', 'post type general name'
        ),
        'singular_name'      => _x(
            'Text Layout', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'Text Layout'),
        'add_new_item'       => __('Add New Text Layout'),
        'edit_item'          => __('Edit Text Layout'),
        'new_item'           => __('New Text Layout'),
        'all_items'          => __('All Text Layout'),
        'view_item'          => __('View Text Layout'),
        'search_items'       => __('Search Text Layout'),
        'not_found'          => __('No Text Layouts found'),
        'not_found_in_trash' => __(
            'No Text Layouts found in the Trash'
        ),
        'parent_item_colon'  => '',
        'menu_name'          => 'Text Layout'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Text Layout data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => null)
    );
    register_post_type('layout_text', $args);
}


add_action('init', 'post_type_issues');
function post_type_issues()
{

    $labels = array(
        'name'               => _x(
            'Issues', 'post type general name'
        ),
        'singular_name'      => _x(
            'Issue', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'Issue'),
        'add_new_item'       => __('Add New Issue'),
        'edit_item'          => __('Edit'),
        'new_item'           => __('New'),
        'all_items'          => __('All Issues'),
        'view_item'          => __('View Issue'),
        'search_items'       => __('Search Issues'),
        'not_found'          => __('No Issues found'),
        'not_found_in_trash' => __(
            'No Issues found in the Trash'
        ),
        'parent_item_colon'  => '',
        'menu_name'          => 'Issues'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our Issue data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'issues')
    );
    register_post_type('issue', $args);
}


add_action('init', 'post_type_new_business');
function post_type_new_business()
{

    $labels = array(
        'name'               => _x(
            'New Business Pages', 'post type general name'
        ),
        'singular_name'      => _x(
            'New Business Page', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'Issue'),
        'add_new_item'       => __('Add New New Business Page'),
        'edit_item'          => __('Edit'),
        'new_item'           => __('New'),
        'all_items'          => __('All New Business Pages'),
        'view_item'          => __('View New Business Page'),
        'search_items'       => __('Search New Business Pages'),
        'not_found'          => __('No New Business Pages found'),
        'not_found_in_trash' => __(
            'No New Business Pages found in the Trash'
        ),
        'parent_item_colon'  => '',
        'menu_name'          => 'New Business Pages'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our New Business Page data',
        'public'        => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            'revisions',
        ),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'new-business')
    );
    register_post_type('new-business-page', $args);
}


add_action('init', 'post_type_external_link');
function post_type_external_link()
{

    $labels = array(
        'name'               => _x(
            'External Links', 'post type general name'
        ),
        'singular_name'      => _x(
            'External Link', 'post type singular name'
        ),
        'add_new'            => _x('Add ', 'Issue'),
        'add_new_item'       => __('Add New External Link'),
        'edit_item'          => __('Edit'),
        'new_item'           => __('New'),
        'all_items'          => __('All External Links'),
        'view_item'          => __('View External Link'),
        'search_items'       => __('Search External Links'),
        'not_found'          => __('No External Links found'),
        'not_found_in_trash' => __(
            'No External Links found in the Trash'
        ),
        'parent_item_colon'  => '',
        'menu_name'          => 'External Links'
    );
    $args = array(
        'labels'        => $labels,
        'description'   => 'Holds our External Link data',
        'public'        => true,
        'menu_position' => 5,
        'taxonomies' => array('category'),
        'supports'      => array(
            'title',
            'editor',
            'revisions',

        ),
        'has_archive'   => false,
        'rewrite'       => array('slug' => 'external-links')
    );
    register_post_type('external-links', $args);
}


/*
 *
 * Adding Image Types Here
 *
 *
 *
*/

add_theme_support('post_thumbnails');

add_image_size('marquee', 1440, 810, true);
add_image_size('marquee_half', 1720, 430, true);
add_image_size('marquee_mobile', 750, 494, true);

add_image_size('tile_square', 385, 290, true);
add_image_size('tile_round', 250, 250, true);

$square_size = 800;
add_image_size('panel_square_full', $square_size, $square_size, true);
add_image_size('panel_square_half', $square_size, $square_size / 2, true);

add_image_size('author_profile', 250, 250, true);
add_image_size('author_portrait', 610, 400, true);

add_image_size('device_panel_imac', 971, 551, true);
add_image_size('device_panel_ipad', 851, 642, true);
add_image_size('device_panel_ipad_vertical', 493, 655, true);
add_image_size('device_panel_iphone_vertical', 322, 571, true);

/*
 * SVG
 * */

add_filter('upload_mimes', 'custom_upload_mimes');
function custom_upload_mimes ( $existing_mimes=array() ) {

    // add the file extension to the array

    $existing_mimes['svg'] = 'image/svg+xml';

    // call the modified list of extensions

    return $existing_mimes;

}
/*
 * Menu Nesting
 */
//
//add_action('admin_menu', 'register_my_custom_submenu_page');
//
//function register_my_custom_submenu_page()
//{
//
//    add_submenu_page('edit.php?post_type=work', 'My Custom Submenu Page', 'My Custom Submenu Page', 'manage_options', 'asdasdmy-custom-submenu-page', 'my_custom_submenu_page_callback');
//}
//
//function my_custom_submenu_page_callback()
//{
//
//    echo '<div class="wrap"><div id="icon-tools" class="icon32"></div>';
//    echo '<h2>My Custom Submenu Page</h2>';
//    echo '</div>';
//
//}
//
//





