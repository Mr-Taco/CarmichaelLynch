<?php get_header(); ?>
<?php container_start(); ?>

            <?php if (have_posts()) : ?>
                <div data-accordion class="gray-bg">
                <?php while (have_posts()) :
                    the_post();?>
                        <?php
                        $post->fields = get_fields($post->ID);
                        $image_registration = set_image_registration($post->fields);
                        ?>

                        <div id="<?=$post->post_name;?>" class="accordion-item category-work">
                            <a href="<?=get_permalink();?>" data-accordion-wrapper-link>
                            <div style="background-image:url('<?=get_field('image')['sizes']['marquee'];?>')" class="accordion-content-image <?= $image_registration ?>"></div>
                            <div class="table">
                                <div class="broken table-center">
                                    <h1><?=the_field('heading');?></h1>
                                    <p><?=the_field('subheading');?></p>
                                    <a class="button categor`-work" href="<?=get_permalink();?>"><span>View Project <i class="fa fa-chevron-right"></i></span></a>
                                </div>
                            </div>
                            </a>
                        </div>

                <?php endwhile; ?>
                </div>
            <?php endif; ?>

<?php get_footer(); ?>