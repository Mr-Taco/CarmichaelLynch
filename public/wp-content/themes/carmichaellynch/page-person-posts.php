<?php

$posts = null;

$slug = get_query_var('person_slug');
$args = [
    'name' => $slug, 'post_type' => 'person', 'numberposts' => 1,
];

$people = get_posts($args);
if(!empty($people)){
    $person = $people[0];
    $posts = get_posts(
        array(
            'post_type'  => 'post', 'posts_per_page' => -1, 'meta_key' => 'person',
            'meta_value' => $person->ID
        )
    );
}
?>
<?php get_header(); ?>
<?php container_start(); ?>
<div class="container tiles-container category-about-person">
    <div class="row">
        <?php
        if (!empty($wp_query->posts)) {
            foreach ($wp_query->posts as $tile_index=>$post) {
                get_template_part('tile');
            }
        }
        ?>
    </div>
</div>
<?php get_footer(); ?>

