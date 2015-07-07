<div class="detail-panel-container">
    <div class="row detail-panel-height-lg">
        <div class="col-xs-12 col-sm-6 <?=($item->fields['tall_panel_position'] == 'right') ? 'col-sm-push-6' : null;?> ">
            <?php
            $panel = prime_panel_fields($item->fields, 'tall');
            $panel_order = 1;
            include('panel.php');
            ?>
        </div>
        <div class="col-xs-12 col-sm-6  <?=($item->fields['tall_panel_position'] == 'right') ? 'col-sm-pull-6' : null;?>">
            <div class="col-xs-12 detail-panel-col-height-xs-6">
                <?php
                $panel = prime_panel_fields($item->fields, 'top');
                $panel_order = 2;
                include('panel.php');
                ?>
            </div>
            <div class="col-xs-12 detail-panel-col-height-xs-6">
                <?php
                $panel = prime_panel_fields($item->fields, 'bottom');
                $panel_order = 3;
                include('panel.php');
                ?>
            </div>
        </div>
    </div>
</div>