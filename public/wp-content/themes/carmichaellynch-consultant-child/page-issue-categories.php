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
}

$issue_category_code = str_replace('-', '_', $issue_category);

$fields = get_fields($issue->ID);

$items = [];
if(!empty($fields['items_' . $issue_category_code])){
    $items = $fields['items_' . $issue_category_code];
}


$headings = [
    'new-projects' => 'New Projects',
    'in-the-news'  => 'In the News',
    'our-thinking' => 'Our Thinking',
    'culture'      => 'Culture',
];

$classes = [
    'new-projects' => 'newProjects',
    'in-the-news'  => 'inTheNews',
    'our-thinking' => 'ourThinking',
    'culture'      => 'culture',
];

?>
<?php get_header(); ?>
<div class="Layout-main">
    <div class="Colored--<?= $classes[$issue_category]; ?> container">
        <h1 class="TitleAlpha Colored-text"><?= $headings[$issue_category]; ?></h1>

        <div class="HeadNotes">
            <div
                class="TitleBeta"><?= date('F Y', strtotime($issue->post_date)); ?></div>
            <div class="TitleEpsilon"><?= $issue->post_title; ?></div>
        </div>
        <div class="Page">
            <?php include "templates/issues/categories/$issue_category.php" ;?>
        </div>
    </div>
</div>
<?php get_footer(); ?>

