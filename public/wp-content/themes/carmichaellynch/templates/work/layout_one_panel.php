<div class="detail-panel-container">
    <div class="row detail-panel-height-<?=$item->fields['panel_height'];?> single">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <?php
            $panel_order = 0;
            $panel = prime_panel_fields($item->fields);
            include('panel.php');
            ?>
        </div>
    </div>
</div>

