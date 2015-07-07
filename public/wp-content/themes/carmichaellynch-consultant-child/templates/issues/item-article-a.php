<?php
$item->fields = get_fields($item->ID);
if($count == 0){
    $image = $item->fields['image']['sizes']['marquee'];
} else {
    $image = $item->fields['image']['sizes']['tile_square'];
}
?>

<div class="ArticleTypeA"><a href="<?=get_main_permalink($item->ID);?>" style="background-image: url(<?=$image;?>)" class="ArticleTypeA-media DarkerLink"><img alt="" src="<?=$image;?>"></a>
    <div class="ArticleTypeA-content">
        <h3 class="ArticleTypeA-title Colored-text"><a href="<?=get_main_permalink($item->ID);?>"><?=$item->post_title;?></a></h3>
        <p><?=get_post_content($item->ID);?></p>
    </div>
</div>

