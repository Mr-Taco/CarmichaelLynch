<video autoplay muted loop="autoplay muted loop">
    <?php if (!empty($webm)): ?>
        <source src="<?= $webm['url']; ?>" type="video/webm;codecs=&quot;vp8, vorbis&quot;"/>
    <?php endif; ?>
    <?php if (!empty($mp4)): ?>
        <source src="<?= $mp4['url']; ?>" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
    <?php endif; ?>
</video>