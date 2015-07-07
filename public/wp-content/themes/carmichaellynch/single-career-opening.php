<?php

$this_page = get_post(get_queried_object_id());
$this_page->fields = get_fields(get_queried_object_id());
$template = 'text';

$template = "templates/post/{$template}.php";
$show_author = true;

foreach (['person'] as $field) {
    ${$field} = isset($this_page->fields[$field]) ? $this_page->fields[$field]
        : null;
}

if (!empty($person)) {
    $person->fields = get_fields($person->ID);
}

$image = $this_page->fields['image']['sizes']['marquee'];
$pagination = true;

?>
<?php get_header(); ?>
<?php container_start(); ?>
<?php if (have_posts()) :
    while (have_posts()) : the_post(); ?>

        <!-- TODO: placed here to make css work, will need to be refactored -->
        <div class="container-fluid">

            <div class="row">

                <div class="col-xs-12 detail-header">
                    <div class="bg-image"
                         style="background-image: url('<?= $image; ?>')"></div>
                    <div class="headlines">
                        <h1><?= $this_page->fields['heading']; ?></h1>
                        <p><?= $post->post_title; ?></p>
                    </div>
                    <div class="publish-details"><span
                            class="author"></span><span class="published"> Published on </span><span
                            class="date"><?= date(
                                'F jS, Y', strtotime($this_page->post_date)
                            ); ?></span></div>
                </div>
            </div>
            <article>
                <div class="row override-grid-padding">
                    <?php include($template); ?>
                </div>
            </article>
        </div>



    <?php
    endwhile;
endif; ?>
<?php get_footer(); ?>