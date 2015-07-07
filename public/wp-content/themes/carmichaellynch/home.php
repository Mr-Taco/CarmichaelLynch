<?php

$this_page = get_post(get_queried_object_id());
$this_page->fields = get_fields(get_queried_object_id());
$gallery = $this_page->fields['gallery'];
$tile_index = 0;
?>
<?php get_header(); ?>

<div class="fixed-header" data-fix-header>
    <?php show_gallery($gallery , false, 0 , 'slide', 'bottom'); ?>
</div>

<?php container_start("", "push-down-marquee", "data-push-down"); ?>
<div class="container-fluid container-override gray-bg">
    <div class="container tiles-container" data-tiles>
        <div class="row">
            <?php
            if (have_posts()) :
                while (have_posts()) :
                    the_post();
                    get_template_part('tile');
                    $tile_index++;
                endwhile;
            endif;
            ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>