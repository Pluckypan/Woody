$(document).ready(function() {
	$("#btnCfgSave").click(function() {
		saveConfigView();
	});

	$("#btnList").click(function() {
		onImageListClick("", "");
	});

	var dirArray = initDirectoryView(false);
	$("#addDir").click(function() {
		var aval = $("#newdir").val();
		if(aval.length == 0) {
			$.toptip('请输入目录名称!', 'error');
		} else {
			var aparent = $("#parent").val();
			if(aparent.length == 0) {
				aparent = "tuchongeter";
			}
			var afinal = aparent + "/" + aval;
			if(dirArray && $.inArray(afinal, dirArray) == -1) {
				dirArray.push(afinal);
				setDirectory(dirArray);
				$.toptip('添加成功', 'success');
				$("#newdir").val("");
				initDirectoryView(true);
			}
		}
	});

	$("#lookDir").click(function() {
		var adef = $("#default").val();
		if(adef.length == 0) {
			adef = "tuchongeter";
		}
		onImageListClick("", adef);
	});

	$("#openDirectory").click(function() {
		initDirectoryView(true);
		var defDir = getDefaultDir();
		$("#default").val(defDir);
		$("#directory").popup();
	});

	$("#openHalf").click(function() {
		//刷新七牛云配置信息
		refreshConfigView();
		$("#half").popup();
	});

	$("#closeDir").click(function() {
		$("#default").select("close");
		$("#parent").select("close");
		$.closePopup();
	});

	$("#pixelInfo").click(function() {
		$.toptip('除图虫相册、画旅途网站超过该分辨率的图片均会被解析', 3000, 'warning');
	});

	$("#pixel").select({
		title: "选择默认解析分辨率",
		onChange: function(data) {
			setDefaultPixel(data.values, data.titles);
		},
		items: [{
			title: "400*300",
			value: 120000,
		}, {
			title: "600*400",
			value: 240000,
		}, {
			title: "800*600",
			value: 480000,
		}, {
			title: "1200*800",
			value: 960000,
		}, {
			title: "1600*900",
			value: 1440000,
		}, {
			title: "1900*1000",
			value: 1900000,
		}]
	});
});

function initDirectoryView(isUpdate) {
	var dirArray = getDirectory();
	if(!dirArray) {
		dirArray = ["tuchongeter"];
	}

	if(isUpdate) {
		$("#default").select("update", {
			items: dirArray
		})
		$("#parent").select("update", {
			items: dirArray
		})
	} else {
		$("#default").select({
			title: "选择默认同步目录",
			items: dirArray,
			onChange: function(d) {
				setDefaultDir(d.values);
			}
		});
		$("#parent").select({
			title: "选择父级目录",
			items: dirArray
		});

		var op = getDefaultPixel();
		$("#pixel").val(op[1]);
	}
	return dirArray;
}

function saveConfigView() {
	var ak = $("#ak").val();
	var sk = $("#sk").val();
	var bucket = $("#bucket").val();
	var domain = $("#domain").val();

	if(ak.length == 0) {
		$.toptip('accesskey不能为空!', 'error');
		return;
	}
	if(sk.length == 0) {
		$.toptip('secretkey不能为空!', 'error');
		return;
	}
	if(bucket.length == 0) {
		$.toptip('bucket不能为空!', 'error');
		return;
	}
	if(domain.length == 0) {
		$.toptip('domain不能为空!', 'error');
		return;
	}
	setQiniuConfig(ak, sk, bucket, domain);
	$.toptip('保存成功', 'success');
	$.closePopup();
}

function refreshConfigView() {
	var cfg = getQiniuConfig();
	if(cfg) {
		$("#ak").val(cfg.AK);
		$("#sk").val(cfg.SK);
		$("#bucket").val(cfg.BUCKET);
		$("#domain").val(cfg.DOMAIN);
	}
}

function onImageListClick(marker, apath) {
	var params = getListParams(marker, apath);
	if(!params) {
		$.confirm({
			title: '图虫图片解析器',
			text: '请先配置七牛云密钥',
			onOK: function() {
				$("#half").popup();
			},
			onCancel: function() {

			}
		});
	} else {
		window.open("list.html?path=" + apath);
	}
}