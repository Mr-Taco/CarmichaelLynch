<?php
$fields = get_fields($post->ID);
$image_registration_class = set_image_registration($fields);
$portrait = get_field('portrait')['sizes']['author_portrait'];

$hide_view_articles_button = get_field('hide_view_articles_button');
if($hide_view_articles_button === false){
    if(does_person_have_posts($post->ID) === false){
        $hide_view_articles_button = true;
    }
}

$pagination = true;

?>

<?php get_header(); ?>
<?php container_start(); ?>
<?php if (have_posts()) :
    while (have_posts()) : the_post(); ?>

        <div id="about-bio" class="category-about container-fluid override-grid-padding">
            <div id="who" class="block col-xs-12 col-md-5" data-transition="0" >
                <div class="text-wrapper col-xs-12">
                    <h1 class="mobile"><?=the_title();?></h1>
                    <h2 class="color-txt mobile"><?=get_field('title');?></h2>
                </div>
                <div style="background-image: url('<?= $portrait;?>'); background-repeat:no-repeat; background-size: cover;" class="bio-face <?= $image_registration_class ?>"></div>
                <?php if($hide_view_articles_button === false): ?>
                <div class="text-wrapper desktop">
                    <p class="read-more"><?=get_field('articles_listing_caption');?></p>
                    <a href="/people/<?=$post->post_name;?>/posts" class="button"><span>View Articles <i class="fa fa-chevron-right"></i></span></a>
                </div>
                <?php endif; ?>
            </div>
            <div id="content" class="col-xs-12 col-md-7" data-transition="1" data-transition-type="text">
                <div class="text-wrapper">
                    <h1 class="desktop"><?=the_title();?></h1>
                    <h2 class="color-txt desktop"git><?=get_field('title');?></h2>
                    <article>
                        <?=the_content();?>
                    </article>
                </div>
            </div>
        </div>


    <?php
    endwhile;
endif; ?>
<?php get_footer(); ?>