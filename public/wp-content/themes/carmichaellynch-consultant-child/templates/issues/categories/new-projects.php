<?php
foreach ($items as $item) :
    $image = get_field('image', $item->ID);
    $alternate_image = get_field('image_alt', $item->ID);

    $image = (!empty($image)) ? $image['sizes']['marquee'] : null;
    $alternate_image = (!empty($alternate_image)) ? $alternate_image['sizes']['marquee'] : null;
?>
    <div class="ArticleTypeC">
        <div class="ArticleTypeC-media"><img alt="" src="<?=$image;?>"></div>
        <div class="ArticleTypeC-content">
            <div>
                <img alt="" src="<?=$alternate_image;?>" width="75">
                <h3 class="ArticleTypeC-title Colored-text"><a href="<?=get_main_permalink($item->ID);?>"><?=$item->post_title;?></a></h3>
                <p><?=get_post_content($item->ID);?></p>
            </div>
        </div>
    </div>
<?php endforeach; ?>