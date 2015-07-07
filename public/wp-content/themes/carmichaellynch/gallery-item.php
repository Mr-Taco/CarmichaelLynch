<?php
$image_registration_class = set_image_registration($item->fields);

$category = get_field('category', $item->ID);
$category = !empty($category) ? "category-{$category->slug}" : null;

$heading = !empty($item->fields['heading']) ? $item->fields['heading'] : "";
$subheading = !empty($item->fields['subheading']) ? $item->fields['subheading'] : "";

$has_video = $item->fields['has_video'];
$image = $item->fields['image']['url'];
if ($has_video === true) {
    $video_type = $item->fields['video_type'];
    switch($video_type) {
        case "autoplay" :
            if(!is_mobile() && !is_tablet())
                $image = isset($item->fields['video_cover']['url']) ? $item->fields['video_cover']['url'] : $image;
            break;
        case "vimeo" :
            if(isset($item->fields['vimeo_url'])){
                $vimeo = true;
                $video_id = $item->fields['vimeo_url'];
                if(!preg_match("/(http(s?):\/\/)/" ,$video_id)) $video_id = "http://".$video_id;
                $video_id = substr(parse_url($video_id, PHP_URL_PATH), 1);
            }
            break;
        case "youtube" : {

        }
    }
}


?>
<!-- TODO Gallery Items need category-type in their class -->
<div id="<?= $item->ID ?>" data-index="<?= $i ?>" data-title="<?= htmlentities($item->post_title) ?>" data-heading="<?= htmlentities($heading) ?>" data-subheading="<?= htmlentities($subheading) ?>" data-gallery-panel class="gallery-item <?= $category; ?> swiper-slide <?= $item->fields['use_marquee'] === true ? "use-marquee" : ""; ?>">
    <div class="theme-color  <?= $category; ?>"></div>
    <?php if ($has_video === true): ?>
        <?php switch($video_type): ?><?php case "vimeo" : ?>
            <?php
                $uid = rand(0,1000);
                $embed = "//player.vimeo.com/video/".$video_id ."?api=1&amp;autoplay=1"
            ?>
            <div class="video-container" data-vimeo id="<?= $uid ?>" data-iframe-embed="<?=$embed ?>">
            </div>
            <?php break; ?>
        <?php case "autoplay" : ?>
            <div data-panel-video="data-panel-video" class="image-tile-container">
                <?php show_video($item->fields['video_mp4'], $item->fields['video_webm']); ?>
            </div>
            <?php break; ?>
        <?php endswitch; ?>
    <?php endif; ?>
    <div style="background-image:url('<?= $image; ?>')"
         class="image <?=$image_registration_class;?>" data-panel-image ></div>
    <div class="play-icon center-xs" data-panel-play-button></div>
    <?php if ($item->fields['use_marquee'] === true): ?>
        <div class="marquee" data-scroll-marquee >

            <div class="copy">
                <h1><?= $heading ?></h1>
                <p><?= $subheading ?></p>
            </div>

            <?php if (!empty($item->fields['button_text']) && !empty($item->fields['button_link'])): ?>
                <a href=" <?= $item->fields['button_link']; ?>" class="button <?= $category; ?>">
                        <span>
                            <?= $item->fields['button_text']; ?>
                            <i class="fa fa-chevron-right"></i>
                        </span>
                </a>
            <?php endif; ?>

        </div>
    <?php endif; ?>
    <!-- <?php if (!empty($item->fields['button_text'])): ?>
        <div class="button <?= $category; ?>">
                <span>
                    <?= $item->fields['button_text']; ?>
                    <i class="fa fa-chevron-right"></i>
                </span>
        </div>
    <?php endif; ?> -->
</div>

