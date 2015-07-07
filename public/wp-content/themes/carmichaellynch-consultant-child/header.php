<?php

$issue_slug = get_query_var('issue_slug');
$issue_category = get_query_var('issue_category');

$args = [
    'name'        => $issue_slug,
    'post_type'   => 'issue',
    'numberposts' => 1,
];

$issues = get_posts($args);
$issue = null;

if (!empty($issues)) {
    $issue = $issues[0];
    $post = $issue;
}

$fields = get_fields($post->ID);
$headshot = $fields['headshot']['sizes']['tile_square'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Carmichael Consultants</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <script src="<?=get_stylesheet_directory_uri();?>/built/main.js"></script>

    <script>
        (function (h,c) {
            'use strict';
            h[c] = h[c].replace(/\bno-js\b/, 'js');

            var isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
            var isTouch = 'ontouchstart' in window || window.navigator.msPointerEnabled;
            var supportsCSS = function (definition) {
                var el = document.createElement('div');
                el.style.cssText = ' -webkit- -moz- -ms- '.split(' ').join(definition);
                return !!el.style.length;
            }

            if (isTouch) {
                h[c] = h[c].replace(/\bno-touch\b/, 'touch');
            }

            //IE9
            if(typeof(console) === 'undefined') {
                console = {};
                console.log = console.warn = function() {};
            }
        })(document.documentElement, 'className');
    </script>
    <?php wp_head(); ?>

</head>
<body>
<div class="Layout Consultants">
    <div class="Layout-sidebar Sidebar">
        <div class="Sidebar-content">
            <input id="Nav-toggle" type="checkbox" class="Nav-toggle">
            <div class="cf"><a href="<?=get_issue_category_url('');?>" class="Sidebar-logo"></a>
                <label for="Nav-toggle" class="Nav-toggle-btn"><span class="visuallyhidden">Open menu</span><span class="Nav-toggle-ln ln-1"></span><span class="Nav-toggle-ln ln-2"></span><span class="Nav-toggle-ln ln-3"></span></label>
            </div>
            <ul class="Nav">
                <li class="Nav-item"><a href="<?=get_issue_category_url('');?>" class="Nav-link Nav-link--current">Home</a></li>
                <li class="Nav-item"><a href="<?=get_issue_category_url('new-projects');?>" class="Nav-link">New projects</a></li>
                <li class="Nav-item"><a href="<?=get_issue_category_url('in-the-news');?>" class="Nav-link">In the news</a></li>
                <li class="Nav-item"><a href="<?=get_issue_category_url('our-thinking');?>" class="Nav-link">Our Thinking</a></li>
                <li class="Nav-item"><a href="<?=get_issue_category_url('culture');?>" class="Nav-link">Culture</a></li>
            </ul>
            <div class="no-mobile">
                <p><img alt="" src="<?=$headshot;?>" class="t-round-image"></p>
                <p><strong><?=$fields['name'];?>, <br></strong><?=$fields['title'];?></p>
                <dl>
                    <dt>Email</dt>
                    <dd><a href="mailto:<?=$fields['email'];?>"><?=$fields['email'];?></a></dd>
                    <dt>Direct</dt>
                    <dd><?=$fields['direct'];?></dd>
                    <dt>Mobile</dt>
                    <dd><?=$fields['mobile'];?></dd>
                </dl>
                <p><a href="//carmichaellynch.com">carmichaellynch.com</a></p>
            </div>
        </div>
    </div>