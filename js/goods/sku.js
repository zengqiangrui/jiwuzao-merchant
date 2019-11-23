var alreadySetSkuVals = {};
$(function() {
	$(document).on("change", '.sku_value', tableChange);
	$(document).on("click", 'delCusSkuType,delCusSkuVal', tableChange);
	//	价格输入框
	$(document).on("change", '.setting_sku_price', function() {
		var value = new Number($(this).val());
		$(this).val(value.toFixed(2));
		if (value > 9999999999.00) {
			$(this).val('9999999999.00');
		}
		if (value <= 0) {
			$(this).val(0.01);
		}
	});
	//库存输入框
	$(document).on("change", '.setting_sku_stock', function() {
		if ($(this).val() > 99999999) {
			$(this).val(99999999);
		}
		var value = new Number($(this).val());
		$(this).val(value.toFixed(0));
		if (value <= 0) {
			$(this).val(1);
		}
	});
});

function tableChange() {
	var b = true;
	var skuTypeArr = [];
	var totalRow = 1;

	//	SKU_TYPE-全局
	$(".SKU_TYPE").each(function() {
		var skuTypeNode = $(this).children("li");
		var skuTypeObj = {};
		skuTypeObj.skuTypeTitle = $(skuTypeNode).attr("sku-type-name"); //	sku-type-name规格
		var propid = $(skuTypeNode).attr("propid");
		skuTypeObj.skuTypeKey = propid;
		var is_required = $(skuTypeNode).attr("is_required");
		skuValueArr = [];
		var skuValNode = $(this).next();
		var skuValCheckBoxs = $(skuValNode).find("input[type='checkbox'][class*='sku_value']");

		var checkedNodeLen = 0;
		$(skuValCheckBoxs).each(function() {
			if ($(this).is(":checked")) {
				var skuValObj = {};
				skuValObj.skuValueTitle = $(this).val();
				skuValObj.skuValueId = $(this).attr("propvalid");
				skuValObj.skuPropId = $(this).attr("propid");
				skuValueArr.push(skuValObj);
				checkedNodeLen++;
			}
		});
		if (skuValueArr && skuValueArr.length > 0) {
			totalRow = totalRow * skuValueArr.length;
			skuTypeObj.skuValues = skuValueArr;
			skuTypeObj.skuValueLen = skuValueArr.length;
			skuTypeArr.push(skuTypeObj);
		};
	});
	var SKUTableDom = "";
	if (b) {
		SKUTableDom += "<table class='skuTable'><tr>";
		for (var t = 0; t < skuTypeArr.length; t++) {
			SKUTableDom += '<th>' + skuTypeArr[t].skuTypeTitle + '</th>';
		}
		SKUTableDom += '<th>价格(单位:元)</th><th>库存</th>';
		SKUTableDom += "</tr>";
		for (var i = 0; i < totalRow; i++) {
			var currRowDoms = "";
			var rowCount = 1;
			var propvalidArr = [];
			var propIdArr = [];
			var propvalnameArr = [];
			var propNameArr = [];
			for (var j = 0; j < skuTypeArr.length; j++) {
				var skuValues = skuTypeArr[j].skuValues;
				var skuValueLen = skuValues.length;
				rowCount = (rowCount * skuValueLen);
				var anInterBankNum = (totalRow / rowCount);
				var point = ((i / anInterBankNum) % skuValueLen);
				propNameArr.push(skuTypeArr[j].skuTypeTitle);
				if (0 == (i % anInterBankNum)) {
					currRowDoms += '<td rowspan=' + anInterBankNum + '>' + skuValues[point].skuValueTitle + '</td>';
					propvalidArr.push(skuValues[point].skuValueId);
					propIdArr.push(skuValues[point].skuPropId);
					propvalnameArr.push(skuValues[point].skuValueTitle);
				} else {
					propvalidArr.push(skuValues[parseInt(point)].skuValueId);
					propIdArr.push(skuValues[parseInt(point)].skuPropId);
					propvalnameArr.push(skuValues[parseInt(point)].skuValueTitle);
				}
			}
			var propvalids = propvalidArr.toString()
			var alreadySetSkuPrice = "";
			var alreadySetSkuStock = "";
			if (alreadySetSkuVals) {
				var currGroupSkuVal = alreadySetSkuVals[propvalids];
				if (currGroupSkuVal) {
					alreadySetSkuPrice = currGroupSkuVal.skuPrice;
					alreadySetSkuStock = currGroupSkuVal.skuStock
				}
			}
			SKUTableDom += '<tr propvalids=\'' + propvalids + '\' propids=\'' + propIdArr.toString() + '\' propvalnames=\'' +
				propvalnameArr.join(",") + '\'  propnames=\'' + propNameArr.join(";") + '\' class="sku_table_tr">' + currRowDoms +
				'<td><input class="setting_sku_price" type="number" value="' + alreadySetSkuPrice +
				'"/></td><td><input type="number" class="setting_sku_stock" value="' + alreadySetSkuStock + '"/></td></tr>';
		}
		SKUTableDom += "</table>";
	};
	$("#skuTable").html(SKUTableDom);

	if ($('#skuTable > table')) {
		$('#submit').show();
	} else {
		$('#submit').hide();
	}
}

var customPropId = -1;
var customPropValId = -1;
$(function() {
	let titleBox = $('#title_box');

	//	添加规格
	$(document).on("click", ".cloneSku", function(e) {
		e.preventDefault();
		let length = $('#title_box > div').length;
		if (length < 5) {
			var cloneSource = $("#skuCloneModel");
			var cloneNode = cloneSource.clone(true);
			cloneNode.css("display", "block");
			cloneNode.removeAttr("id");
			customPropId--;
			$(cloneNode).find(".cusSkuTypeInput").parent().attr("propid", customPropId);
			$(cloneNode).find(".cusSkuValInput").prev().attr("propid", customPropId);
			customPropValId--;
			$(cloneNode).find(".cusSkuValInput").prev().attr("propvalid", customPropValId);
			titleBox.append(cloneNode);
			$('#title_box .cloneSkuVal:last').trigger('click');
		} else {
			alert('超出规格上限');
		}
	});

	//	添加分类
	$(document).on("click", ".cloneSkuVal", function(e) {
		e.preventDefault();
		var flag = false;
		$(this).parents("ul").find("li").each(function(index, element) {
			if (index == 20) {
				alert('超过分类上限')
				flag = true;
			}
		})
		if (flag) {
			return;
		}
		var cloneSource = $("#onlySkuValCloneModel");
		var cloneNode = cloneSource.clone(true);
		cloneNode.removeAttr("id");
		var propid = $(this).parents("ul").prev().find("li").attr("propid");
		$(cloneNode).find(".cusSkuValInput").prev().attr("propid", propid);
		customPropValId--;
		$(cloneNode).find(".cusSkuValInput").prev().attr("propvalid", customPropValId);
		cloneNode.css("display", "block");
		$(this).before(cloneNode);
	});

	//规格标题
	$(document).on("change", ".cusSkuTypeInput", function(e) {
		e.preventDefault();
		var isHaveThisSkuType = false;
		var customSkuTypeName = $(this).val();
		if ($(this).val().length > 8) {
			$(this).val('')
		}
		if (!/^[a-zA-Z\u4e00-\u9fa5]{1}$/.test(customSkuTypeName.substring(0, 1))) {
			$(this).val('')
			alert('规格名称需以字母汉字开头')
		}
		if (customSkuTypeName) {
			$("ul[class*='SKU_TYPE']").find("li").each(function() {
				var currSkuTypeName = $(this).attr("sku-type-name");
				if (currSkuTypeName == customSkuTypeName) {
					isHaveThisSkuType = true;
				}
			});
		};
		if (isHaveThisSkuType) {
			alert("该规格已经存在!");
			$(this).val("");
		};
		$(this).parent().attr("sku-type-name", $(this).val());
		if (!$(this).val() || isHaveThisSkuType) {
			$(this).parent().parent().next().find("input[type='checkbox'][class*='sku_value']").each(function() {
				$(this).attr("checked", false)
				$(this).removeClass("sku_value");
			});
		};
		$(".model_sku_val").trigger("change");
		tableChange();
	});
	//分类标题 
	$(document).on("change", ".cusSkuValInput", function(e) {
		e.preventDefault();
		var isHaveSkuVal = false;
		var thisSkuVal = $(this).val();
		if (thisSkuVal.length > 20) {
			$(this).val("");
		}
		if (!thisSkuVal) {
			tableChange();
		}
		$(".model_sku_val,.sku_value").each(function() {
			var customSkuVal = $(this).val();
			if (thisSkuVal == customSkuVal) {
				isHaveSkuVal = true;
			};
		});
		if (isHaveSkuVal && thisSkuVal) {
			alert("该分类已存在!");
			$(this).val("");
		}
		if (!thisSkuVal || isHaveSkuVal) {
			$(this).prev().removeClass("sku_value");
			if ($(this).prev().is(":checked")) {
				$(this).prev().attr("checked", false);
			};
		} else if (thisSkuVal) {
			$(this).prev().attr("checked", true);
			$(this).prev().addClass("sku_value");
		};
		$(this).prev().val(thisSkuVal);
		$(".model_sku_val").trigger("change");
		tableChange();
		$("input[type='checkbox']").first().trigger("change");
	});

	//	移除
	$(document).on("click", ".delCusSkuType", function() {
		let length = $('#title_box > div').length;
		$(this).parent().parent().parent().remove();
		$("input[type='checkbox']").first().trigger("change");
		tableChange();
	});

	//	删除元素
	$(document).on("click", ".delCusSkuVal", function() {
		$(this).parent().remove();
		$("input[type='checkbox']").first().trigger("change");
		tableChange();
	});

	//显示table
	tableChange();
	//显示第一个类型
	$(".cloneSku").trigger("click");
})

function getSkuData() {
	var contArr = {
		type: [],
		typeClass: [],
		spec: []
	};
	var flag = true;
	var type = [];
	$('#title_box .cusSkuTypeInput').each(function() {
		type.push($(this).val());
	});
	$('#title_box>div').each(function(index) {
		let arr = []
		$(this).find('.cusSkuValInput').each(function() {
			arr.push($(this).val())
		})
		let o = {};
		o[type[index]] = arr
		contArr.typeClass[index] = o
	})
	contArr.type = type;
	var typeLen = $('#title_box .SKU_TYPE').length;
	type = type.slice(0, typeLen);
	$('#skuTable .sku_table_tr').each(function() {
		var specs = $(this).attr('propvalnames');
		var price = $(this).find('.setting_sku_price').val();
		var inventory = $(this).find('.setting_sku_stock').val();
		if (price == '' || inventory == '') {
			flag = false;
		}
		if (type.length != specs.split(",").length) {
			flag = false;
		}
		contArr.spec.push({
			'specClass': specs,
			'specPrice': price,
			'specInventory': inventory
		});
	});
	contArr.type.forEach(function(value, i) {
		if (!value) {
			flag = false
		}
	})
	contArr.typeClass.forEach(function(value, i) {
		Object.keys(value).forEach(function(key) {
			value[key].forEach(function(value, i) {
				if (!value) {
					flag = false
				}
			})
		})
	})
	if (flag) {
		if (contArr.spec.length > 200) {
			alert('商品规格超出上限200个');
			return null;
		}
		// contArr.type = JSON.stringify(contArr.type)
		// contArr.typeClass = JSON.stringify(contArr.typeClass)
		// contArr.spec = JSON.stringify(contArr.spec);
		return contArr;
	} else {
		alert('规格信息未填写完整');
		return null;
	}
}
