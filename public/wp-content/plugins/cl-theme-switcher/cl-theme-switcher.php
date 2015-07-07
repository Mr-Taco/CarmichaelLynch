<?php

/**
 * Plugin Name: CL Theme Switcher
 * Plugin URI: http://www.carmichaellynch.com
 * Description: Switches the theme to use consultant theme if URL matches
 * Version: 1.0.0
 * Author: Wildlife
 * Author URI: http://wildlife.la
 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

add_filter('option_stylesheet', 'change_theme');

function change_theme()
{
    $url = null;
    if(isset($_SERVER['HTTP_HOST'])){
        $url = $_SERVER['HTTP_HOST'];
    } else {
        $url = $_SERVER['SERVER_NAME'];
    }

    $theme = 'carmichaellynch';

    $consultant_urls = [
        'consultant.carmichaellynch.com',
        'update.carmichaellynch.com',
        'update.local.dev.carmichaellynch.com',
        'cl-dev3.wildlife.la',
    ];

    if(in_array($url, $consultant_urls)){
        $theme = 'carmichaellynch-consultant-child';
    }

    return $theme;
}