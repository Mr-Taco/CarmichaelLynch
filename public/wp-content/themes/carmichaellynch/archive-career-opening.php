<?php
$tile_index = 0;
get_header(); ?>
<?php container_start(); ?>
<?php if(count($wp_query->posts) > 0) : ?>
    <div class="container tiles-container category-career-openings" data-tiles>
        <div class="row">
            <?php if (have_posts()) :
                $i = 0;
                while (have_posts()) :
                    the_post(); ?>
                    <?php get_template_part('tile');  $tile_index++;?>
                <?php
                endwhile;
            endif; ?>
        </div>
    </div>
<?php endif; ?>
<?php get_footer(); ?>