<div data-video-panel="data-video-panel" class="image-tile" <?= (!$no_transition) ? "data-transition=\"".($row_order + $panel_order)."\"" : "" ?>   data-transition-type="scale">
    <?php
        $image_registration_class = set_image_registration($panel);
    ?>
    <div style="background-image: url('<?= $panel['image']['url']; ?>');"
         data-panel-image="data-panel-image" class="image-tile-container <?= $image_registration_class ?>"></div>
    <?php if (!empty($panel['video_mp4']) || !empty($panel['video_webm'])): ?>
        <div data-panel-video="data-panel-video" class="image-tile-container">
            <video autoplay muted loop="autoplay muted loop">
                <?php if (!empty($panel['video_webm'])): ?>
                    <source src="<?= $panel['video_webm']['url']; ?>" type="video/webm;codecs=&quot;vp8, vorbis&quot;"/>
                <?php endif; ?>
                <?php if (!empty($panel['video_mp4'])): ?>
                    <source src="<?= $panel['video_mp4']['url']; ?>" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                <?php endif; ?>
            </video>
        </div>
    <?php endif; ?>
</div>
