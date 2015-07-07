<?php

$headline = isset($item->fields['headline']) ? $item->fields['headline'] : "";
$image_registration_class = set_image_registration($item->fields);

?>

<div class="detail-panel-container">
    <div class="row detail-panel-height-lg pos-rel">
        <div class="col-xs-12">
            <div class="image-tile" data-transition="<?= $row_order ?> " data-transition-type="slide" data-transition-direction="bottom">
                <div style="background-image: url('<?= get_field('image',$item->ID)['url']; ?>');"
                     data-panel-image="data-panel-image" class="image-tile-container <?= $image_registration_class ?>"></div>


            </div>
        </div>
        <div class="col-xs-12 text-overlap stats">

            <div class="text-tile stats <?=get_field('text_color', $item->ID);?>" data-transition="<?= ($row_order + 1); ?>" data-transition-type="text" data-transition-delay="0.5">
                <h3><?=$headline?></h3>

                <span class="divider colored"></span>
                <?=get_post_content($item->ID);?>
            </div>
        </div>
    </div>
</div>