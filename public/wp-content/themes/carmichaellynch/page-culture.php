<?php
$this_page = get_post(get_queried_object_id());
$this_page->fields = get_fields(get_queried_object_id());


$marquee_image = $this_page->fields['marquee_image']['sizes']['marquee'];
$marquee_image_mobile = $this_page->fields['marquee_image_mobile']['sizes']['marquee_mobile'];
$roofstage_pass_background = $this_page->fields['roofstage_pass_background_image']['sizes']['panel_square_full'];
$carmichael_collective_background = $this_page->fields['carmichael_collective_background_image']['sizes']['panel_square_full'];
$carmichael_cares_background = $this_page->fields['carmichael_cares_background_image']['sizes']['panel_square_full'];



?>
<?php get_header(); ?>
    <div class="fixed-header" data-fix-header data-transition="0" data-transition-type="slide" data-transition-direction="bottom">
        <?php include("templates/page-header.php"); ?>
    </div>

<?php container_start("" , "push-down-marquee gray-bg" , "data-push-down"); ?>
    <div class="hero-marquee-copy push-text-marquee" data-push-text data-transition="1"  data-transition-type="slide" data-transition-direction="bottom">
        <h1><?= $post->post_title; ?></h1>
        <h2><?= $this_page->fields['subheading']; ?></h2>
    </div>
    <div class="content container-fluid">
        <div class="detail-tile-container two-square">
            <div class="row col-xs-12 col-med-12" >
                <a href="<?= $this_page->fields['roofstage_pass_button_link']; ?>">
                    <div
                        class="image-tile large col-xs-12 col-sm-6 col-sm-push-6" data-transition="2" data-transition-type="scale" >
                        <div style="background-image: url('<?= $roofstage_pass_background; ?>');" class="image-tile-container img-center"></div>
                        </div>
                </a>
                <div class="text-tile large col-xs-12 col-sm-6 col-sm-pull-6" data-transition="3" data-transition-type="text" >
                    <div class="text-wrapper">
                        <h1 class="color-txt pad-bottom"><?= $this_page->fields['roofstage_pass_headline']; ?></h1>
                        <p class="subheader"><?= $this_page->fields['roofstage_pass_body']; ?></p>
                        <a class="button" href="<?= $this_page->fields['roofstage_pass_button_link']; ?>">
                            <span>
                                <div class="animate-view-all">
                                    <span class="square"></span><span class="square"></span><span class="square"></span><span class="square"></span><span class="square"></span><span class="square"></span>
                                </div>
                                <p><?= $this_page->fields['roofstage_pass_button_text']; ?></p>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content container-fluid">
        <div class="detail-tile-container two-square">
            <div class="row col-xs-12 col-med-12">
                <a href="<?= $this_page->fields['carmichael_collective_button_link']; ?>">

                    <div class="image-tile large col-xs-12 col-sm-6" data-transition="4" data-transition-type="scale">
                        <div style="background-image: url('<?= $carmichael_collective_background; ?>');" class="image-tile-container img-center"></div>
                    </div>
                </a>
                <div class="text-tile large col-xs-12 col-sm-6" data-transition="5" data-transition-type="text" >
                    <div class="text-wrapper">
                        <h1 class="color-txt pad-bottom"><?= $this_page->fields['carmichael_collective_headline']; ?></h1>
                        <p class="subheader"><?= $this_page->fields['carmichael_collective_body']; ?></p>
                        <a class="button" href="<?= $this_page->fields['carmichael_collective_button_link']; ?>">
                            <span>
                                <div class="animate-view-all">
                                    <span class="square"></span><span class="square"></span><span class="square"></span><span class="square"></span><span class="square"></span><span class="square"></span>
                                </div>
                                <p><?= $this_page->fields['carmichael_collective_button_text']; ?></p>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content container-fluid">


        <div id="carmichael-cares" class="row" data-transition="1">
            <div class="left-wrapper col-lg-6" data-transition="2" data-transition-type="text">
                <div class="content-wrapper">

                    <h1 class="color-txt pad-bottom"><?= $this_page->fields['carmichael_cares_headline']; ?></h1>
                    <p class="subheader"><?= $this_page->fields['carmichael_cares_body']; ?></p>


                    <ul class="linksList-desktop">
                        <?php foreach ($this_page->fields['carmichael_cares_list'] as $i => $carmichael_cares)
                            : ?>

                            <?php $entity = '["_trackEvent", "about", "click", "' . (string)$carmichael_cares->post_title . '"]'; ?>


                            <li class="link-item <?= $i === 0 ? 'active inactive' : 'inactive' ?>"
                                data-index="<?= $i ?>" data-ga="<?= htmlentities($entity) ?>" ><?= $carmichael_cares->post_title; ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <?php if($this_page->fields['carmichael_cares_caption'] !== "") : ?>
                        <div class="list-footer-desktop col-xs-12">
                            <p><?= $this_page->fields['carmichael_cares_caption']; ?></p>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <div style="background: url('<?= $carmichael_cares_background; ?>') center center no-repeat; background-size: cover;"  class="right-wrapper col-xs-12 col-lg-6">
                <div class="content-wrapper" data-transition="2" data-transition-type="text">
                    <div class='text-wrapper'>
                        <h1 class="color-txt pad-bottom"><?= $this_page->fields['carmichael_cares_headline']; ?></h1>

                        <p class="subheader"><?= $this_page->fields['carmichael_cares_body']; ?></p>
                    </div>
                    <div class="linkslist-wrapper">
                        <ul class="linksList">
                            <?php foreach (
                                $this_page->fields['carmichael_cares_list'] as $i => $carmichael_cares
                            ): ?>

                                <?php
                                $carmichael_caresFields = get_fields($carmichael_cares->ID);
                                $backgroundImage
                                    = $carmichael_caresFields['background_image']['sizes']['panel_square_full'];
                                $entity = '["_trackEvent", "about", "click", "' . (string)$carmichael_cares->post_title . '"]';
                                ?>

                                <li id="link-item-<?= $carmichael_cares->post_name; ?>"
                                    class="<?= $i === 0 ? 'active' : 'inactive' ?> link-item" data-ga="<?= htmlentities($entity) ?>" >
                                    <p class="link-item-title"><?= $carmichael_cares->post_title; ?></p>

                                    <div class="content"><?= apply_filters('the_content' , $carmichael_cares->post_content); ?></div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <?php if($this_page->fields['carmichael_cares_caption'] !== "") : ?>
                            <div class="list-footer">
                                <p><?= $this_page->fields['carmichael_cares_caption']; ?></p>
                            </div>

                        <?php  else : ?>
                            <div class="col-xs-12 list-footer-padding"></div>

                        <?php endif; ?>


                    </div>
                </div>
            </div>
        </div>

    </div>

<?php get_footer(); ?>