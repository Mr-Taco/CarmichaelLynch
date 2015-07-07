<?php
/*
$first = !empty($wp_query->posts) ? array_shift($wp_query->posts) : null;
$fields = !empty($first) ? get_fields($first->ID) : false;

if(isset($first)) {
    try{
        $category = "category-".get_category(wp_get_post_categories($first->ID)[0])->slug;
    }catch(Exception $e) {
        $category = "";
    }

}*/

?>

<?php get_header(); ?>

<?php if(isset($first)) : ?>
    <div class="type-marquee">
        <div class="gallery-item <?= $category; ?> swiper-slide">
            <div class="theme-color  <?= $category; ?>"></div>
            <div
                style="background-image:url('<?= $fields['image']['url']; ?>')"
                class="image"></div>
            <div class="marquee">

                <div class="copy">
                    <?php if (!empty($fields['heading'])): ?>
                        <h1><?= $fields['heading']; ?></h1>
                    <?php endif; ?>
                    <?php if (!empty($fields['subheading'])): ?>
                        <p><?= $fields['subheading']; ?></p>
                    <?php endif; ?>

                    <div class="button <?= $category; ?>">
                        <a href="/<?=$first->post_name; ?>">
                                <span>
                                    SEE MORE
                                    <i class="fa fa-chevron-right"></i>
                                </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>
<?php container_start(); ?>
<?php if(count($wp_query->posts) > 0) : ?>
    <div class="container tiles-container category-culture" data-tiles>
        <div class="row">
            <?php
            if(!empty($wp_query->posts)){
                foreach ($wp_query->posts as $tile_index=>$post) {
                    get_template_part('tile');
                }
            }
            ?>
        </div>
    </div>
<?php endif; ?>

<?php get_footer(); ?>