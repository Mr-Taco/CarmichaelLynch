<?php
$this_page = get_post(get_queried_object_id());
$this_page->fields = get_fields(get_queried_object_id());
$invert_tiles = true;


$marquee_image = $this_page->fields['marquee_image']['sizes']['marquee'];
$marquee_image_mobile = $this_page->fields['marquee_image_mobile']['sizes']['marquee_mobile'];
$craft_background = $this_page->fields['craft_background_image']['sizes']['panel_square_full'];
$clients_background =  $this_page->fields['clients_background_image']['sizes']['panel_square_half'];
$use_multiple_images = $this_page->fields['use_multiple_images'];
$persons = isset($this_page->fields['persons']) && gettype($this_page->fields['persons']) === "array" ? $this_page->fields['persons'] : array();
$client_logos = [];

if($use_multiple_images) {
    $client_logos = $this_page->fields['client_logos'];

    foreach($client_logos as $k=>$v) {
        $v->fields =  get_fields($client_logos[$k]->ID);
    }
}


?>
<?php get_header(); ?>
<div class="fixed-header" data-fix-header data-transition="0" data-transition-type="slide" data-transition-direction="bottom">
    <?php include("templates/page-header.php"); ?>
</div>

<?php container_start("" , "push-down-marquee gray-bg" , "data-push-down"); ?>
    <div class="hero-marquee-copy push-text-marquee" data-push-text data-transition="1" data-transition-type="slide" data-transition-direction="bottom">
        <h1><?= $post->post_title; ?></h1>
        <h2><?= $this_page->fields['subheading']; ?></h2>
    </div>
    <div id="our-craft" class="row" data-transition="1">
        <div class="left-wrapper col-lg-6" data-transition="2" data-transition-type="text">
            <div class="content-wrapper">

                <h1 class="color-txt pad-bottom"><?= $this_page->fields['craft_header']; ?></h1>
                <p class="subheader"><?= $this_page->fields['craft_body']; ?></p>


                <ul class="linksList-desktop">
                    <?php foreach ($this_page->fields['craft_list'] as $i => $craft)
                        : ?>

                        <?php $entity = '["_trackEvent", "about", "click", "' . (string)$craft->post_title . '"]'; ?>


                        <li class="link-item <?= $i === 0 ? 'active inactive' : 'inactive' ?>"
                            data-index="<?= $i ?>" data-ga="<?= htmlentities($entity) ?>" ><?= $craft->post_title; ?></li>
                    <?php endforeach; ?>
                </ul>
                <?php if($this_page->fields['craft_caption'] !== "") : ?>
                <div class="list-footer-desktop col-xs-12">
                    <p><?= $this_page->fields['craft_caption']; ?></p>
                </div>
                <?php endif; ?>
            </div>
        </div>

        <div style="background: url('<?= $craft_background; ?>') center center no-repeat; background-size: cover;"  class="right-wrapper col-xs-12 col-lg-6">
            <div class="content-wrapper" data-transition="2" data-transition-type="text">
                <div class='text-wrapper'>
                    <h1 class="color-txt pad-bottom"><?= $this_page->fields['craft_header']; ?></h1>

                    <p class="subheader"><?= $this_page->fields['craft_body']; ?></p>
                </div>
                <div class="linkslist-wrapper">
                    <ul class="linksList">
                        <?php foreach (
                            $this_page->fields['craft_list'] as $i => $craft
                        ): ?>

                            <?php
                            $craftFields = get_fields($craft->ID);
                            $backgroundImage
                                = $craftFields['background_image']['sizes']['panel_square_full'];
                            $entity = '["_trackEvent", "about", "click", "' . (string)$craft->post_title . '"]';
                            ?>

                            <li id="link-item-<?= $craft->post_name; ?>"
                                class="<?= $i === 0 ? 'active' : 'inactive' ?> link-item" data-ga="<?= htmlentities($entity) ?>" >
                                <p class="link-item-title"><?= $craft->post_title; ?></p>

                                <div class="content"><?= apply_filters('the_content' , $craft->post_content); ?></div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <?php if($this_page->fields['craft_caption'] !== "") : ?>
                    <div class="list-footer">
                        <p><?= $this_page->fields['craft_caption']; ?></p>
                    </div>

                    <?php  else : ?>
                        <div class="col-xs-12 list-footer-padding"></div>

                    <?php endif; ?>


                </div>
            </div>
        </div>
    </div>
    <div id="clients" data-transition="3">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-sm-push-6">
                <div class="clients-text col-xs-12 col-md-12" data-transition="2" data-transition-type="text">
                    <div class="text-wrapper">
                        <h1 class="color-txt pad-bottom"><?= $this_page->fields['clients_header']; ?></h1>

                        <p class="subheader"><?= $this_page->fields['clients_body']; ?></p>
                    </div>
                </div>
                <div
                    style="background: url('<?= $clients_background; ?>') center center no-repeat; background-size: cover;"
                    class="clients-desktop-tile col-xs-12 col-md-12"></div>
            </div>
            <div class="col-xs-12 col-sm-6 col-sm-pull-6">
                <div class="clients-logos col-xs-12 col-md-12">
                    <div class="clients-logos-list-wrapper">
                        <?php if($use_multiple_images) : ?>
                            <ul class="client-logo-list">
                                <?php foreach($client_logos as $i=>$logo) : ?>
                                    <li data-transition="<?= 3 + $i ?>">
                                        <div class="client-logo-item"   style="background-image: url('<?= $logo->fields['logo_image']['url'];?>');"></div>
                                    </li>
                                <?php endforeach; ?>
                            </ul>

                        <?php else : ?>
                            <div class="clients-logos-background" style="background-image: url('<?= $this_page->fields['clients_logos_single_image']['url'];?>');" data-transition="3">

                            </div>

                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="whoweare">
        <div class="container tiles-container" >
            <div class="row"  data-transition="5" data-transition-type="text">
                <div class="text-wrapper">
                    <h1 class="color-txt pad-bottom"><?= $this_page->fields['who_we_are_header']; ?></h1>

                    <p class="subheader"><?= $this_page->fields['who_we_are_body']; ?></p>
                </div>
            </div>
            <div class="row" data-tiles >
                <?php foreach ($persons as $tile_index=>$post){
                    set_query_var('invert_tiles', $invert_tiles);
                    get_template_part('tile');
                } ?>

            </div>
        </div>
    </div>



<?php get_footer(); ?>