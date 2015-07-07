<?php

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_stylesheet_directory_uri() . '/built/style.css' );
}

function get_main_permalink($id){
    $post = get_post($id);
    if($post->post_type == 'external-links'){
        $url = get_field('url', $post->ID);
        return $url;
    } else {
        return str_replace(home_url(), 'http://' . WP_MAIN_SITE_DOMAIN, get_permalink($id));
    }
}

function get_issue_category_url($text){

    $issue_slug = get_query_var('issue_slug');

    $args = [
        'name'        => $issue_slug,
        'post_type'   => 'issue',
        'numberposts' => 1,
    ];

    $issues = get_posts($args);
    $issue = null;

    if (!empty($issues)) {
        $issue = $issues[0];
    }

    return "http://$_SERVER[HTTP_HOST]/issues/{$issue->post_name}/$text";
}
