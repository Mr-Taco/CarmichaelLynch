<?php

$locations = get_nav_menu_locations();

$primary_menu = null;
$filter_menu = null;

if(!empty($locations['header'])){
    $primary_menu = wp_get_nav_menu_items($locations['header']);
}
if(!empty($locations['filter'])){
    $filter_menu = wp_get_nav_menu_items($locations['filter']);
}

global $prev_post, $next_post, $view_all, $pagination;
$prev_post = null;
$next_post = null;
$view_all = null;


if(!empty($post)) {
    if ($post->post_type == 'post') {
        $view_all = '/news';
    } elseif ($post->post_type == 'person') {
        $view_all = '/about';
    } else {
        $view_all = get_post_type_archive_link($post->post_type);
    }

    $prev_post = get_adjacent_post(false, '', false);
    if (!$prev_post) {
        $args = [
            'posts_per_page' => 1,
            'order'          => 'DESC',
            'post_type'      => $post->post_type,
        ];

        $first = new WP_Query($args);
        if (!empty($first->post)) {
            $prev_post = $first->post;
            wp_reset_query();
        }
    }

    $next_post = get_adjacent_post(false, '', true);
    if (!$next_post) {
        $args = [
            'posts_per_page' => 1,
            'order'          => 'ASC',
            'post_type'      => $post->post_type
        ];

        $last = new WP_Query($args);
        if (!empty($last->post)) {
            $next_post = $last->post;
            wp_reset_query();
        }
    }
}

?>
<!DOCTYPE html  >
<html <?php language_attributes(); ?> class="<?= is_mobile() ? "mobile" : "" ?> <?= is_tablet() ? "tablet" : "" ?>  <?= is_ie(9) ? "ie9" : "" ?> <?= is_ie(10) ? "ie10" : "" ?> <?= is_ie(11) ? "ie11" : "" ?> <?= is_ipad(7) || is_iphone(7) ? "ios7" : "" ?>" >
<head>
    <meta charset="<?php bloginfo('charset'); ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title(' | ', true, 'right'); ?></title>


    <?php if(is_ie()) : ?>
        <script src="<?= get_stylesheet_directory_uri() ?>/source/static_dependencies/console.shim.js"></script>
        <script src="<?= get_stylesheet_directory_uri() ?>/source/static_dependencies/matchMedia.js"></script>

        <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/ie-1.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/ie-2.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/ie-3.css"/>
    <?php else : ?>
        <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/style.css"/>
    <?php endif; ?>


    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />

    <!--[if gte IE 9]>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
    <style type="text/css">
        .gradient {
            filter: none;
        }
    </style>
    <![endif]-->

    <?php wp_head(); ?>
</head>
<body id="<?= page_id(); ?>" class="<?= cl_body_class(); ?>">


<!-- TODO: Header -->
<header id="header">
    <div id="menu" class="header-button"><span
            class="horizontal-line"></span><span class="horizontal-line"></span><span
            class="horizontal-line"></span></div>
    <a href="/">
        <div id="logo" class="header-button flip-button"><span
                class="flip-content"></span></div>
    </a>

    <?php if(!empty($prev_post)): ?>
    <a href="<?= get_permalink($prev_post->ID); ?>">
        <div id="header-prev"
             class="header-button break-right flip-button desktop"><span
                class="flip-content"><i class="fa fa-angle-left"></i></span>
        </div>
    </a>
    <?php endif; ?>

    <?php if(!empty($next_post)): ?>
    <a href="<?= get_permalink($next_post->ID); ?>">
        <div id="header-next" class="header-button flip-button desktop"><span
                class="flip-content"><i class="fa fa-angle-right"></i></span>
        </div>
    </a>
    <?php endif; ?>

    <div id="filter" class="header-button flip-button"><span
            class="flip-content"></span></div>
    <div id="header-view-all" class="header-button desktop">
        <a href="<?=$view_all;?>">
        <div class="animate-view-all"><span class="square"></span><span
                class="square"></span><span class="square"></span><span
                class="square"></span><span class="square"></span><span
                class="square"></span></div>
            </a>
    </div>
</header>
<div id="filter-menu">
    <div id="close-filter" class="close header-button">
        <div class="rotate-content"></div>
    </div>
    <ul>
        <?php foreach ($filter_menu as $filter_menu_item):
            $filter_item_category = null;
            if ($filter_menu_item->object == 'category') {
                $parent = get_category($filter_menu_item->object_id);
                $filter_item_category = "category-" . $parent->slug;
            }
            ?>
            <li class="filter-item <?= $filter_item_category; ?>"><a
                    href="<?= $filter_menu_item->url; ?>"><span><?= $filter_menu_item->title; ?></span></a>
            </li>
        <?php endforeach; ?>
    </ul>
</div>
<nav class="overlay">
    <div id="close-nav" class="close header-button">
        <div class="rotate-content"></div>
    </div>
    <ul class="nav-list">
        <?php foreach ($primary_menu as $primary_menu_item): ?>
            <li class="nav-item" id="nav-<?= strtolower(
                preg_replace("/[^A-Za-z0-9]/", "", $primary_menu_item->title)
            ); ?>"><a
                    href="<?= $primary_menu_item->url; ?>"><?= $primary_menu_item->title; ?></a>
            </li>
        <?php endforeach; ?>
    </ul>
</nav>
<!-- END: Header -->


