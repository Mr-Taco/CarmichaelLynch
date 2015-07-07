<?php
$fields = get_fields($post->ID);
$items_new_projects = $fields['items_new_projects'];
$items_our_thinking = $fields['items_our_thinking'];
$items_in_the_news = $fields['items_in_the_news'];
$items_culture = $fields['items_culture'];

?>
<?php get_header(); ?>
<div class="Layout-main">
    <div class="container">
        <h1 class="TitleAlpha"><?=get_field('heading');?></h1>
        <div class="HeadNotes">
            <div class="TitleBeta"><?= date('F Y', strtotime($post->post_date)); ?></div>
            <div class="TitleEpsilon"><?= $post->post_title; ?></div>
        </div>
        <div class="Page">
            <div class="Page-main">
                <div class="Page-section Colored--newProjects">
                    <a href="<?=get_issue_category_url('new-projects');?>">
                        <h2 class="TitleBeta Page-header Colored-bg">New Projects</h2>
                    </a>

                    <?php
                    if (!empty($items_new_projects)) {
                        $count = 0;
                        foreach ($items_new_projects as $item) {
                            include 'templates/issues/item-article-a.php';
                            $count++;
                        }
                    }
                    ?>

                    <a href="<?=get_issue_category_url('new-projects');?>" class="Colored-link">View All</a>
                </div>
            </div>
            <div class="Page-sidebar">
                <div class="Page-section Colored--ourThinking">
                    <a href="<?=get_issue_category_url('our-thinking');?>">
                        <h2 class="TitleBeta Page-header Colored-bg">Our thinking</h2>
                    </a>

                    <?php
                    if (!empty($items_our_thinking)) {
                        $count = 0;
                        foreach ($items_our_thinking as $item) {
                            include 'templates/issues/item-article-b.php';
                            $count++;
                        }
                    }
                    ?>

                    <a href="<?=get_issue_category_url('our-thinking');?>" class="Colored-link">View All</a>
                </div>
                <div class="Page-section Colored--inTheNews">
                    <a href="<?=get_issue_category_url('in-the-news');?>">
                        <h2 class="TitleBeta Page-header Colored-bg">In the news</h2>
                    </a>

                    <?php
                    if (!empty($items_in_the_news)) {
                        $count = 0;
                        foreach ($items_in_the_news as $item) {
                            include 'templates/issues/item-article-b.php';
                            $count++;
                        }
                    }
                    ?>
                    <a href="<?=get_issue_category_url('in-the-news');?>" class="Colored-link">View All</a>
                </div>
                <div class="Page-section Colored--culture">
                    <a href="<?=get_issue_category_url('culture');?>">
                        <h2 class="TitleBeta Page-header Colored-bg">Culture</h2>
                    </a>

                    <?php
                    if (!empty($items_culture)) {
                        $count = 0;
                        foreach ($items_culture as $item) {
                            include 'templates/issues/item-article-b.php';
                            $count++;
                        }
                    }
                    ?>

                    <a href="<?=get_issue_category_url('culture');?>" class="Colored-link">View All</a>
                </div>
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>