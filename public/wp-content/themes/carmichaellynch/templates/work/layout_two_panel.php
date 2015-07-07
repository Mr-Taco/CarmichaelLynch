

<?php


$leftClass = "col-xs-12 col-sm-6";
$rightClass = "col-xs-12 col-sm-6";
$left = "left";
$right = "right";
$fields = $item->fields;
if($fields['left_panel_type'] === 'text'){
    $left = "right";
    $right = "left";

    $leftClass = $leftClass." col-sm-push-6";
    $rightClass = $rightClass." col-sm-pull-6";

}

?>



<div class="detail-panel-container">
    <div class="row detail-panel-height-<?=$item->fields['panel_height'];?>">
        <div class="<?= $leftClass ?>">
            <?php
            $panel = prime_panel_fields($item->fields, $left);
            $panel_order = 1;
            include('panel.php');
            ?>
        </div>
        <div class="<?= $rightClass ?>">
            <?php
            $panel = prime_panel_fields($item->fields, $right);
            $panel_order = 2;
            include('panel.php');
            ?>
        </div>
    </div>
</div>


