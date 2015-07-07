<div class="content <?php if ($show_author): ?> col-xs-12 col-sm-7 col-md-8 col-lg-9 <?php else: ?> col-xs-12 col-lg-pad-right <?php endif; ?>">
    <div class="block">
        <?php the_content(); ?>
    </div>
    <?php if(isset($this_page->fields['apply_button_url']) && isset($this_page->fields['apply_button_text'])) : ?>
        <?php $entity = '["_trackEvent", "apply_now", "click", "' . (string)$post->post_title . '"]'; ?>
        <div id="apply-now" class="block">
            <a href="<?= $this_page->fields['apply_button_url']; ?>" target="_blank" class="button" data-ga="<?= htmlentities($entity); ?>"><span><?= $this_page->fields['apply_button_text']; ?> <i class="fa fa-chevron-right"></i></span></a>
        </div>
    <?php endif; ?>


</div>
<?php if ($show_author): include(dirname(__FILE__) . '../../person.php'); endif; ?>