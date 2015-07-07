<?php

$this_page = get_post(get_queried_object_id());
$this_page->fields = get_fields(get_queried_object_id());

foreach(['gallery','featured_posts'] as $field){
    ${$field} = isset($this_page->fields[$field]) ? $this_page->fields[$field] : null;
}

?>
<?php get_header(); ?>

<div class="fixed-header" data-fix-header >
    <?php show_gallery($gallery, false, 0, "slide" , "bottom"); ?>
</div>


<?php container_start(null, "push-down-marquee", "data-push-down"); ?>
    <div class="container-fluid container-override  gray-bg">
        <div class="container tiles-container" >
            <div class="row">
                <?php $tile_index = 0; ?>
                <?php foreach($featured_posts as $i=>$post):
                    $tile_index = $i;
                    get_template_part('tile');
                endforeach; ?>
            </div>
        </div>
    </div>

<?php get_footer(); ?>