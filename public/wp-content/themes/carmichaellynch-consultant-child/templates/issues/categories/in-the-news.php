<?php
foreach ($items as $item) :
    $image = get_field('image', $item->ID);
    $alternate_image = get_field('image_alt', $item->ID);

    $image = (!empty($image)) ? $image['sizes']['marquee'] : null;
    $alternate_image = (!empty($alternate_image))
        ? $alternate_image['sizes']['marquee'] : null;
    ?>
    <div class="ArticleTypeC">
        <a href="<?= get_main_permalink($item->ID); ?>" class="ArticleTypeC-media DarkerLink">
            <img alt="" src="<?= $image; ?>">
        </a>
        <div class="ArticleTypeC-content">
            <img alt="" src="<?= $alternate_image; ?>" width="200">
            <h3 class="ArticleTypeC-title Colored-text">
                <a href="<?= get_main_permalink($item->ID); ?>"><?= $item->post_title; ?></a>
            </h3>
            <p><?= get_post_content($item->ID); ?></p>
            <p><a href="<?= get_main_permalink($item->ID); ?>" class="MoreLink">Read More</a></p>
        </div>
    </div>
<?php endforeach; ?>



