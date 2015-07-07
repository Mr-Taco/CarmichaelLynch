<?php
foreach ($items as $item) :
    $image = get_field('image', $item->ID);
    $alternate_image = get_field('image_alt', $item->ID);

    $image = (!empty($image)) ? $image['sizes']['tile_round'] : null;
    $alternate_image = (!empty($alternate_image)) ? $alternate_image['sizes']['marquee'] : null;

    $blurb = get_field('blurb',$item->ID);

    ?>
    <a href="<?=get_main_permalink($item->ID);?>" class="MediaItem LineLink">
        <div class="MediaItem-media MediaItem-media--micro">
            <img alt="" src="<?= $image; ?>" class="t-round-image">
        </div>
        <div class="MediaItem-content">
            <div class="TitleZeta"><?=get_field('heading',$item->ID);?></div>
            <h3 class="TitleBeta Colored-text"><?=$item->post_title;?></h3>
            <div class="t-small-spacing-top"><?=$blurb;?></div>
        </div>
    </a>
<?php endforeach; ?>

