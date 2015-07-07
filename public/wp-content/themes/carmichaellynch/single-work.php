<?php

$items = get_field('items');
$fields = get_fields($post->ID);
$image_registration_class = set_image_registration($fields);
$pagination = true;
?>
<?php get_header(); ?>

<div class="fixed-header" data-fix-header data-transition="0"  data-transition-type="slide" data-transition-direction="bottom">
    <div id="marquee" class="detail-panel-container marquee fill-height-sm">

         <div class="image-tile">
            <div class="image-tile-container <?= $image_registration_class ?>"
                 style="background-image:url('<?= get_field('image')['sizes']['marquee']; ?>');"></div>
        </div>
    </div>
</div>
<?php container_start("" , "detail-push-down black-bg", "data-push-down"); ?>
    <div class="black-bg-cover"></div>

    <div class="text-tile push-text-marquee" data-push-text data-transition="1"  data-transition-type="slide" data-transition-direction="bottom">
        <h1 class="marquee"><?= the_field('heading'); ?></h1>
        <h2 class="marquee"><?= the_field('subheading'); ?></h2>
        <div class="marquee-copy-wrapper">


            <span class="divider"></span>
            <?= the_content(); ?>
        </div>
    </div>
<?php if (have_posts()) :
    while (have_posts()) : the_post(); ?>




        <?php
        $no_transition = false;
        if ($items) {
            foreach ($items as $row_order=>$item) {
                $item->fields = get_fields($item->ID);
                $template = $item->post_type;
                include("templates/work/$template.php");
            }
        }
        ?>



    <?php
    endwhile;
endif; ?>
<?php get_footer(); ?>