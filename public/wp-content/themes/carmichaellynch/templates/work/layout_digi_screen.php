<?php
$alignment = $item->fields['device_alignment'];

?>

<div class="digital-screen override-grid-padding gradient detail-panel-container">
    <div class="row">


        <div class="<?=$item->fields['device_type'] == 'iphone v' ? 'col-xs-12 col-sm-5 ' : 'col-xs-12 col-sm-7 col-md-8 col-lg-9' ;?> <?=$item->fields['device_alignment'] == 'left' ? 'digital-screen-offset' : 'col-sm-push-5 col-md-push-4 col-lg-push-3'; ?>">

                <div class="digital-screen-device-container vertical-center-sm <?=$item->fields['device_type'];?>" data-transition="<?= $row_order; ?>" data-transition-type="slide" data-transition-direction="<?=    $item->fields['device_alignment'] == 'left' ? 'left' : 'right'   ?>">

                    <div class="digital-screen-device-content-container">
                        <div class="digital-screen-device-content-container-wrapper">
                            <?php
                            $panel = prime_panel_fields($item->fields, 'top');
                            $no_transition = true;
                            include('panel.php');
                            $no_transition = false;
                            ?>
                        </div>

                    </div>
                    <div class="digital-screen-device-image"></div>

                </div>

        </div>
        <div class="<?=$item->fields['device_type'] == 'iphone v' ? 'col-xs-12 col-sm-7 col-md-6 col-lg-5' : 'col-xs-12 col-sm-5 col-md-4 col-lg-3' ;?>  <?=$item->fields['device_alignment'] == 'left' ? null : 'col-sm-pull-7 col-md-pull-8 col-lg-pull-9'; ?>">
            <div class="digital-screen-info">

                <div class="table centered text-center-xs <?=$item->fields['device_alignment'] == 'left' ? 'text-left-sm' : 'text-left-sm'?>">
                    <div class="table-center" data-transition="<?= $row_order ?>" data-transition-type="text">
                        <h3><?=$item->fields['heading'];?></h3>
                        <?=$item->fields['text'];?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>