<?php
$item->fields = get_fields($item->ID);
$image = $item->fields['image']['sizes']['tile_round'];
$blurb = get_field('blurb',$item->ID);
?>

<a href="<?=get_main_permalink($item->ID);?>" class="ArticleTypeB">
    <div class="ArticleTypeB-roundMedia"><img alt="" src="<?=$image;?>"></div>
    <div class="ArticleTypeB-content">
        <div>
            <div class="ArticleTypeB-tag"><?=get_field('heading',$item->ID);?></div>
            <h3 class="ArticleTypeB-title Colored-text"><?=$item->post_title;?></h3>
            <?php if(!empty($blurb)): ?>
            <div class="ArticleTypeB-blurb BottomAligner">
                <div class="BottomAligner-left"><?=$blurb;?></div>
                <div class="BottomAligner-right"><img alt="" src="<?=$image;?>" class="t-round-image"></div>
            </div>
            <?php endif; ?>
        </div>
    </div>
</a>