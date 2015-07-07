<?php if (!empty($items)): ?>
    <?php
    $item = $items[0];

    $image = get_field('image', $item->ID);
    $alternate_image = get_field('image_alt', $item->ID);

    $image = (!empty($image)) ? $image['sizes']['marquee'] : null;
    $alternate_image = (!empty($alternate_image)) ? $alternate_image['sizes']['marquee'] : null;

    ?>
    <div class="Page-main t-main-text">

        <div class="t-bottom-hairline">
            <img alt="" src="<?= $image; ?>">
        </div>

        <?= get_post_content($item->ID); ?>
    </div>
    <div class="Page-sidebar">

        <?php for ($i = 1; $i < count($items); $i++):

            $item = $items[$i];

            $image = get_field('image', $item->ID);
            $alternate_image = get_field('image_alt', $item->ID);

            $image = (!empty($image)) ? $image['sizes']['marquee'] : null;
            $alternate_image = (!empty($alternate_image)) ? $alternate_image['sizes']['marquee'] : null;

            ?>
            <div class="t-bottom-hairline"><img alt="" src="<?= $image; ?>">

                <h3 class="TitleBeta Colored-text t-medium-spacing">
                    <a href="<?= get_main_permalink($item->ID); ?>"><?= $item->post_title; ?></a>
                </h3>

                <?= get_post_content($item->ID); ?>

                <a href="<?= get_main_permalink($item->ID); ?>" class="MoreLink">Learn More</a>
            </div>
        <?php endfor; ?>
    </div>

<?php endif; ?>