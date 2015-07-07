<?php

$fields = get_fields($post->ID);

$invert_class = "";
if(isset($invert_tiles)) {
    $invert_class = " invert-sm";
}







$classes = 'tile post col-xs-12 col-sm-4 col-md-3';

$show_author = (isset($fields['show_author'])) ? $fields['show_author'] : false;


if($post->post_type == 'person') {
    $image = $fields['headshot']['sizes']['author_profile'];
}elseif($show_author === true) {

    $personFields = get_fields($fields['person']->ID);
    if(isset($personFields['portrait'])) {
        $image = $personFields['portrait']['sizes']['tile_square'];
        $classes = 'tile post has-author col-xs-12 col-sm-4 col-md-3';
    }

}else{
    $image = $fields['image']['sizes']['tile_square'];
}


//w?


$tile_index = $GLOBALS['tile_index'];
if(empty($tile_index)){
    $tile_index = 0;
}




?>

    <div id="post-<?= $post->ID; ?>" <?php post_class( $classes.$invert_class ); ?>  data-transition="<?= $tile_index ?>" data-transition-type="tiles">
        <a href="<?= the_permalink(); ?>">
            <div class="tile-inner">
                <div class="picture"
                     style="background-image:url('<?= $image; ?>')"></div>
                <div class="caption">
                    <div class="center">
                        <?php if($post->post_type == 'person'): ?>
                            <h1><?= $post->post_title; ?></h1>
                            <p><?= $fields['title']; ?></p>
                        <?php else: ?>
                            <h1><?= $fields['heading']; ?></h1>
                            <p><?= $fields['subheading']; ?></p>
                        <?php endif; ?>

                    </div>
                </div>
                <?php if($show_author) : ?>
                    <div class="author"><span>by <?=$fields['person']->post_title ?></span></div>
                <?php endif; ?>
            </div>

        </a>
    </div>

