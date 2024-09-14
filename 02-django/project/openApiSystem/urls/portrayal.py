from django.urls import path

from openApiSystem.views.portrayal import (get, post, put, delete)

app_name = 'openApiSystem'
urlpatterns = [
    path('get/visual_item_list/', get.visual_item_list),
    path('get/symbol_list/', get.symbol_list),
    path('get/line_style_list/', get.line_style_list),
    path('get/area_fill_list/', get.area_fill_list),
    path('get/pixmap_list/', get.pixmap_list),
    path('get/item_schema_list/', get.item_schema_list),
    path('get/symbol_schema_list/', get.symbol_schema_list),
    path('get/line_style_schema_list/', get.line_style_schema_list),
    path('get/area_fill_schema_list/', get.area_fill_schema_list),
    path('get/pixmap_schema_list/', get.pixmap_schema_list),
    path('get/colour_profile_schema_list/', get.colour_profile_schema_list),
    path('get/colour_token_list/', get.colour_token_list),
    path('get/palette_item_list/', get.palette_item_list),
    path('get/colour_palette_list/', get.colour_palette_list),
    path('get/display_plane_list/', get.display_plane_list),
    path('get/display_mode_list/', get.display_mode_list),
    path('get/viewing_group_layer_list/', get.viewing_group_layer_list),
    path('get/viewing_group_list/', get.viewing_group_list),
    path('get/font_list/', get.font_list),
    path('get/context_parameter_list/', get.context_parameter_list),
    path('get/drawing_priority_list/', get.drawing_priority_list),
    path('get/alert_list/', get.alert_list),
    path('get/alert_highlight_list/', get.alert_highlight_list),
    path('get/alert_info_list/', get.alert_info_list),

    # path('get/symbol_detail/', get.symbol_detail),
    # path('get/line_style_detail/', get.line_style_detail),
    # path('get/area_fill_detail/', get.area_fill_detail),
    # path('get/pixmap_detail/', get.pixmap_detail),
    # path('get/item_schema_detail/', get.item_schema_detail),
    # path('get/symbol_schema_detail/', get.symbol_schema_detail),
    # path('get/line_style_schema_detail/', get.line_style_schema_detail),
    # path('get/area_fill_schema_detail/', get.area_fill_schema_detail),
    # path('get/pixmap_schema_detail/', get.pixmap_schema_detail),
    # path('get/colour_profile_schema_detail/', get.colour_profile_schema_detail),
    # path('get/colour_token_detail/', get.colour_token_detail),
    # path('get/palette_item_detail/', get.palette_item_detail),
    # path('get/colour_palette_detail/', get.colour_palette_detail),
    # path('get/display_plane_detail/', get.display_plane_detail),
    # path('get/display_mode_detail/', get.display_mode_detail),
    # path('get/viewing_group_layer_detail/', get.viewing_group_layer_detail),
    # path('get/viewing_group_detail/', get.viewing_group_detail),
    # path('get/font_detail/', get.font_detail),
    # path('get/context_parameter_detail/', get.context_parameter_detail),
    # path('get/drawing_priority_detail/', get.drawing_priority_detail),
    # path('get/alert_detail/', get.alert_detail),
    # path('get/alert_highlight_detail/', get.alert_highlight_detail),
    # path('get/alert_info_detail/', get.alert_info_detail),
    

    # path('post/symbol/', post.symbol),
    # path('post/line_style/', post.line_style),
    # path('post/area_fill/', post.area_fill),
    # path('post/pixmap/', post.pixmap),
    # path('post/item_schema/', post.item_schema),
    # path('post/symbol_schema/', post.symbol_schema),
    # path('post/line_style_schema/', post.line_style_schema),
    # path('post/area_fill_schema/', post.area_fill_schema),
    # path('post/pixmap_schema/', post.pixmap_schema),
    # path('post/colour_profile_schema/', post.colour_profile_schema),
    # path('post/colour_token/', post.colour_token),
    # path('post/palette_item/', post.palette_item),
    # path('post/colour_palette/', post.colour_palette),
    # path('post/display_plane/', post.display_plane),
    # path('post/display_mode/', post.display_mode),
    # path('post/viewing_group_layer/', post.viewing_group_layer),
    # path('post/viewing_group/', post.viewing_group),
    # path('post/font/', post.font),
    # path('post/context_parameter/', post.context_parameter),
    # path('post/drawing_priority/', post.drawing_priority),
    # path('post/alert/', post.alert),
    # path('post/alert_highlight/', post.alert_highlight),
    # path('post/alert_info/', post.alert_info),

    # path('put/symbol/', put.symbol),
    # path('put/line_style/', put.line_style),
    # path('put/area_fill/', put.area_fill),
    # path('put/pixmap/', put.pixmap),
    # path('put/item_schema/', put.item_schema),
    # path('put/symbol_schema/', put.symbol_schema),
    # path('put/line_style_schema/', put.line_style_schema),
    # path('put/area_fill_schema/', put.area_fill_schema),
    # path('put/pixmap_schema/', put.pixmap_schema),
    # path('put/colour_profile_schema/', put.colour_profile_schema),
    # path('put/colour_token/', put.colour_token),
    # path('put/palette_item/', put.palette_item),
    # path('put/colour_palette/', put.colour_palette),
    # path('put/display_plane/', put.display_plane),
    # path('put/display_mode/', put.display_mode),
    # path('put/viewing_group_layer/', put.viewing_group_layer),
    # path('put/viewing_group/', put.viewing_group),
    # path('put/font/', put.font),
    # path('put/context_parameter/', put.context_parameter),
    # path('put/drawing_priority/', put.drawing_priority),
    # path('put/alert/', put.alert),
    # path('put/alert_highlight/', put.alert_highlight),
    # path('put/alert_info/', put.alert_info),

    # path('delete/symbol/', delete.symbol),
    # path('delete/line_style/', delete.line_style),
    # path('delete/area_fill/', delete.area_fill),
    # path('delete/pixmap/', delete.pixmap),
    # path('delete/item_schema/', delete.item_schema),
    # path('delete/symbol_schema/', delete.symbol_schema),
    # path('delete/line_style_schema/', delete.line_style_schema),
    # path('delete/area_fill_schema/', delete.area_fill_schema),
    # path('delete/pixmap_schema/', delete.pixmap_schema),
    # path('delete/colour_profile_schema/', delete.colour_profile_schema),
    # path('delete/colour_token/', delete.colour_token),
    # path('delete/palette_item/', delete.palette_item),
    # path('delete/colour_palette/', delete.colour_palette),
    # path('delete/display_plane/', delete.display_plane),
    # path('delete/display_mode/', delete.display_mode),
    # path('delete/viewing_group_layer/', delete.viewing_group_layer),
    # path('delete/viewing_group/', delete.viewing_group),
    # path('delete/font/', delete.font),
    # path('delete/context_parameter/', delete.context_parameter),
    # path('delete/drawing_priority/', delete.drawing_priority),
    # path('delete/alert/', delete.alert),
    # path('delete/alert_highlight/', delete.alert_highlight),
    # path('delete/alert_info/', delete.alert_info),
]