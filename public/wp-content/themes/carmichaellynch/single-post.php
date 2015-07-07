<?php

$this_page = get_post(get_queried_object_id());
$this_page->fields = get_fields(get_queried_object_id());

foreach (['gallery', 'template', 'show_author', 'person'] as $field) {
    ${$field} = isset($this_page->fields[$field]) ? $this_page->fields[$field]
        : null;
}

if(isset($gallery)){
    if(is_array($gallery) && count($gallery) > 0) {
        $gallery = $gallery[0];
    }
}

if(!empty($person)){
    $person->fields = get_fields($person->ID);
}
$image_registration = set_image_registration($this_page->fields);
$template = "templates/post/{$template}.php";
$image = $this_page->fields['image']['sizes']['marquee_half'];

$pagination = true;

?>
<?php get_header(); ?>

<div class="fixed-header" data-fix-header>
    <div class="row">
        <div class="col-xs-12 detail-header gray-bg" data-transition="1" data-minus-height>
            <div class="bg-image <?= $image_registration ?>"
                 style="background-image: url('<?= $image; ?>')">
            </div>
        </div>
    </div>
</div>

<?php container_start(); ?>
<?php if (have_posts()) :
    while (have_posts()) : the_post(); ?>

        <div class="container-fluid" data-transition="0" data-fill-minus>
            <div class="row">

                <div class="col-xs-12 col-lg-pad-right detail-header sliding-header" data-transition="1" data-minus-height>
                    <div class="headlines">
                        <h1><?= $this_page->fields['heading']; ?></h1>

                        <p><?= $this_page->fields['subheading']; ?></p>
                    </div>
                    <div class="publish-details"><span
                            class="author"></span><span class="published"> Published on </span><span
                            class="date"><?= date(
                                'F jS, Y', strtotime($this_page->post_date)
                            ); ?></span></div>
                </div>
            </div>

            <article data-fill-height>
                <div class="row override-grid-padding">


                    <?php include($template); //this way all values in this file will flow throw without any wp trickery ?>
                </div>
            </article>
        </div>



    <?php
    endwhile;
endif; ?>
<?php get_footer(); ?>