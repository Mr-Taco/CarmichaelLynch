<?php
$this_page = get_post(get_queried_object_id());
$this_page->fields = get_fields(get_queried_object_id());

$marquee_image = $this_page->fields['marquee_image']['sizes']['marquee'];
$marquee_image_mobile = $this_page->fields['marquee_image_mobile']['sizes']['marquee_mobile'];




?>
<?php get_header(); ?>
    <div class="fixed-header" data-fix-header data-transition="0" data-transition-type="slide" data-transition-direction="bottom">
        <?php include("templates/page-header.php"); ?>
    </div>

<?php container_start("" , "push-down-marquee gray-bg" , "data-push-down"); ?>
    <div class="hero-marquee-copy push-text-marquee" data-push-text data-transition="1"  data-transition-type="slide" data-transition-direction="bottom">
        <h1><?= $post->post_title; ?></h1>
        <h2><?= $this_page->fields['subheading']; ?></h2>
    </div>

<?php get_footer(); ?>