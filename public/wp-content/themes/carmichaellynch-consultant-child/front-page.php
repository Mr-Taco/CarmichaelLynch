<?php

$args = [
    'post_type'   => 'issue',
    'numberposts' => 1,
    'meta_key'    => 'is_sub_issue',
    'meta_value'  => '0'
];

$issues = get_posts($args);
if (!empty($issues)) {
    $issue = $issues[0];
    header('Location: ' . get_permalink($issue->ID));
}
