<?php

$contact_us_page = get_page_by_path('contact', OBJECT);
$contact_us_page->fields = get_fields($contact_us_page->ID);

$logo = get_field('logo');
$background = get_field('background');

$logo = !empty($logo) ? $logo['url'] : null;
$background = !empty($background) ? $background['url'] : null;

$items = get_field('links');
$items = !empty($items) ? $items : [];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Carmichael New Business</title>
    <meta charset="<?php bloginfo('charset'); ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php wp_title(' | ', true, 'right'); ?></title>

    <link rel="stylesheet" type="text/css"
          href="<?php echo get_stylesheet_directory_uri(); ?>/newbiz.css"/>
    <link rel="shortcut icon"
          href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico"/>

    <?php wp_head(); ?>

    <script>
        (function (h, c) {
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
            if (typeof(console) === 'undefined') {
                console = {};
                console.log = console.warn = function () {
                };
            }
        })(document.documentElement, 'className');
    </script>
</head>
<body>
<div class="Layout">
    <div class="Layout-sidebar Sidebar">
        <div class="Sidebar-content"><a href="./"
                                        class="Sidebar-logo centered-on-mobile"></a>

            <div class="no-mobile">
                <p><strong><?= get_field('name'); ?>, <br></strong><span
                        class="thin"><?= get_field('title'); ?></span></p>
                <dl>
                    <dt>Email</dt>
                    <dd class="thin"><a
                            href="mailto:<?= get_field('email'); ?>"><?= get_field('email'); ?></a>
                    </dd>
                    <dt>Direct</dt>
                    <dd class="thin"><?= get_field('direct'); ?></dd>
                    <dt>Mobile</dt>
                    <dd class="thin"><?= get_field('mobile'); ?></dd>
                </dl>
                <p class="thin"><?= $contact_us_page->fields['address']; ?>,
                    <br> <?= $contact_us_page->fields['city']; ?>
                    , <?= $contact_us_page->fields['state']; ?>  <br>(612)
                    334-6000 <br><a href="//carmichaellynch.com" class="thick">carmichaellynch.com</a>
                </p>
            </div>
        </div>
    </div>
    <div style="background-image: url(<?= $background; ?>)"
         class="Layout-main PageBackground no-padding-on-mobile">
        <div class="BizLogo">
            <img alt="Business logo"  src="<?= $logo; ?>">
        </div>
        <div style="color: <?=get_field('highlight_color');?>" class="OverlayLink-list">

            <?php foreach($items as $item):?>

            <a href="<?=$item['url'];?>" class="OverlayLink">
                <svg class="OverlayLink-icon">
                    <use x="0" y="0" width="100%" height="100%" xlink:href="<?=$item['icon']['url'];?>#Layer_1"></use>
                </svg>
                <div class="OverlayLink-text"><?=$item['description'];?></div>
            </a>

            <?php endforeach; ?>

        </div>
    </div>
    <div class="Footer">
        <p><strong><?= get_field('name'); ?>,</strong> <span class="thin"><?= get_field('title'); ?></span>
        </p>
        <dl>
            <dt>Email</dt>
            <dd class="thin Footer-block"><a
                    href="mailto:<?= get_field('email'); ?>"><?= get_field('email'); ?></a>
            </dd>
            <dt>Direct</dt>
            <dd class="thin Footer-block"><?= get_field('direct'); ?></dd>
            <dt>Mobile</dt>
            <dd class="thin Footer-block"><?= get_field('direct'); ?></dd>
        </dl>
        <p><span class="thin Footer-block"><?= $contact_us_page->fields['address']; ?>, <br
                    class="xso-only"><?= $contact_us_page->fields['city']; ?>, <?= $contact_us_page->fields['state']; ?></span><span
                class="thin Footer-block">(612) 334-6000</span><a
                href="//carmichaellynch.com" class="thick Footer-block">carmichaellynch.com</a>
        </p>
    </div>
</body>
</html>