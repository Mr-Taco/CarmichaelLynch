<?php
$gallery->fields = get_fields($gallery->ID);

foreach ($gallery->fields['items'] as $k => $item) {
    $gallery->fields['items'][$k]->fields = get_fields($item->ID);
}

$gallery_id = "gallery-{$gallery->ID}";

//autoset options
$options = ['autoplay','peek','directions','strap','info','viewAll',];
foreach($options as $k => $v){
    $options[$v] = isset($gallery->fields[$v]) ? $gallery->fields[$v] : null;
    unset($options[$k]);
}


$gallery_type = "type-".$gallery->fields['display_type'];
if($responsive_gallery === true) {
    $gallery_type ="";
}

?>

<div id="<?=$gallery_id;?>" class="gallery-container swiper-container <?=$gallery_type;?>" <?php foreach($options as $k => $v){ echo "data-{$k}=\"{$v}\" "; } ?> data-gallery <?= isset($transition_order) ? "data-transition=\"$transition_order\"" : ""; ?> <?= isset($transition_type) ? "data-transition-type=\"$transition_type\"" : ""; ?> <?= isset($transition_direction) ? "data-transition-direction=\"$transition_direction\"" : ""; ?>>
    <div class="gallery swiper-wrapper">
        <?php foreach ($gallery->fields['items'] as $i=>$item): ?>
            <?php show_gallery_item($item, $i); ?>

        <?php endforeach; ?>
    </div>

    <div class="gallery-info-strap"><span class="info"></span></div>
    <div class="gallery-view-all"></div>
    <div class="gallery-pagination"></div>
    <div class="gallery-prev-next">
        <div id="next" class="direction">
            <div class="fa fa-angle-right"></div>
            <div class="blurb"><span></span></div>
        </div>
        <div id="prev" class="direction">
            <div class="fa fa-angle-left"></div>
            <div class="blurb"><span></span></div>
        </div>
    </div>
    <div class="gallery-view-all-panel">
        <div class="close header-button"></div>
        <div class="table gallery-view-all-panel-inner">
            <div class="row table-center"></div>
        </div>

    </div>
</div>
