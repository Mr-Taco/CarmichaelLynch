<div id="hero" class="row">
    <div id="hero-video-about" class="hero-video-container" data-video-panel>
        <div class="hero-image" data-panel-image>
            <div
                style="background-image:url(<?= $marquee_image; ?>)"
                class="desktop"></div>
            <div
                style="background-image:url(<?= $marquee_image_mobile; ?>)"
                class="mobile"></div>
        </div>
        <?php if ($this_page->fields['marquee_video_webm'] !== false) : ?>
            <div class="hero-video"  data-panel-video>
                <video preload="auto" loop="loop" autoplay="autoplay">
                    <source
                        src="<?= $this_page->fields['marquee_video_webm']['url']; ?>"
                        type="video/webm;codecs=&quot;vp8, vorbis&quot;"/>
                    <source
                        src="<?= $this_page->fields['marquee_video_mp4']['url']; ?>"
                        type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                </video>
            </div>
        <?php endif; ?>

    </div>
</div>