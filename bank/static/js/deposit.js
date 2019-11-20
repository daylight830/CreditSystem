var password, confirm_password, amount, type, time, proportion;


/*选择不同的存款类型有不同的下拉框*/
function choose_type(){
	type = $("#Type").find("option:selected").text();

	if(type=="定期存款"){
		$("#duration").html("");
		$("#CurrentProportion").html("");
        var content =
            '<label class="col-sm-4 control-label" for="name">存款时间:</label>'+
            '   <div class="col-sm-8">'+
            '       <select class="form-control" id="Time">'+
            '           <option value="0">三个月</option>'+
            '           <option value="1">六个月</option>'+
            '           <option value="2">一年</option>'+
            '           <option value="3">两年</option>'+
            '           <option value="4">三年</option>'+
            '           <option value="5">五年</option>'+
            '        </select>'+
            '   </div>';
        $("#duration").append(content);
	}

	else if(type=="定活两存"){
		$("#duration").html("");
        var content =
            '<label class="col-sm-4 control-label" for="name">存款时间:</label>'+
            '   <div class="col-sm-8">'+
            '       <select class="form-control" id="Time">'+
            '           <option value="0">三个月</option>'+
            '           <option value="1">六个月</option>'+
            '           <option value="2">一年</option>'+
            '           <option value="3">两年</option>'+
            '           <option value="4">三年</option>'+
            '           <option value="5">五年</option>'+
            '        </select>'+
            '   </div>';
        $("#duration").append(content);

		$("#CurrentProportion").html("");
        var content =
            '<label class="col-sm-4 control-label" for="name">活期存款占比:</label>'+
            '   <div class="col-sm-8">'+
            '       <select class="form-control" id="Proportion">'+
            '           <option value="0">25%</option>'+
            '           <option value="1">50%</option>'+
            '           <option value="2">75%</option>'+
            '        </select>'+
            '   </div>';
        $("#CurrentProportion").append(content);
    }
    else if(type=="活期存款"){
    	$("#duration").html("");
    	$("#CurrentProportion").html("");
    }

}

function passwordLimit(){
    password = $("#Password").val();
    confirm_password = $("#ConfirmPassword").val();
    if(password != confirm_password){
        layer.tips("两次密码不相同！","#ConfirmPassword");
    }
}

function Confirm_deposit(){

    password = $("#Password").val();
    confirm_password = $("#ConfirmPassword").val();
    amount = $("#Amount").val();
    type = $("#Type").find("option:selected").text();

    var reg=/^\d{6}$/; ; //密码6位数字


	if(password == "" || password == null){
        layer.tips("密码不能为空！", "#Password");
    }
    else if(!reg.test(password)){
        layer.tips("密码格式不正确！", "#Password");
    }
    else if(confirm_password == "" || confirm_password == null){
        layer.tips("请再次确认密码！", "#ConfirmPassword");
    }
    else if(password != confirm_password){
    layer.tips("两次密码不相同！","#ConfirmPassword");
    }
    else if(amount == "" || amount == null){
        layer.tips("存款金额不能为空！", "#Amount");
    }
    else{
    	if(type=="活期存款"){
	        Demand_deposits(password, amount, type);
		}
		else if(type=="定期存款"){
			time = $("#Time").find("option:selected").text();
		    Time_deposit(password, amount, type, time);
		}
		else if(type=="定活两存"){
			time = $("#Time").find("option:selected").text();
			proportion = $("#Proportion").find("option:selected").text();
			Fixed_survival(password, amount, type, time, proportion);
		}
	}
}

/*活期存款*/
function Demand_deposits(password, amount, type){
	/*console.log(password, amount, type);*/
	$.ajax({
        url : '',  //请求活期存款接口
        data : {"pwd":password,
                "DepositAmount" :amount,
                "DepositType":type},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.state == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo1', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "活期存款成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            window.location.reload();
            }
            else{
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo1', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "活期存款失败" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }
        },
        error : function () {
            layer.msg("请求接口失败！")
        }
    });

}

/*定期存款*/
function Time_deposit(password, amount, type, time){
	/*console.log(password, amount, type, time);*/
	$.ajax({
        url : '',  //请求活期存款接口
        data : {"pwd":password,
                "DepositAmount" :amount,
                "DepositType":type,
                "DepositTerm": time},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.state == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "定期存款成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            window.location.reload();
            }

            else{
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo2', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "定期存款失败" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }

        },
        error : function () {
            layer.msg("请求接口失败！")
        }
    });
}

/*定活两存*/
function Fixed_survival(password, amount, type, time, proportion){
	/*console.log(password, amount, type, time, proportion);*/
	$.ajax({
        url : '',  //请求活期存款接口
        data : {"pwd":password,
                "DepositAmount" :amount,
                "DepositType":type,
                "DepositTerm": time,
                "DepositRatio": proportion},
        type : 'post',
        scriptCharset : 'utf-8',
        success : function (result) {
            if(result.state == "success") {
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo3', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "定活两存成功！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            window.location.reload();
            }

            else{
                layer.open({
                    type: 1,
                    offset: 'auto',
                    id: 'layerDemo3', //防止重复弹出
                    content: '<div style="padding: 20px 100px;">' + "定活两存失败！" + '</div>',
                    btn: '关闭',
                    btnAlign: 'c', //按钮居中
                    shade: 0.5, //不显示遮罩
                    title: "HZNUCTF",
                    yes: function () {
                        layer.closeAll();
                    }
                });
            }

        },
        error : function () {
            layer.msg("请求接口失败！")
        }
    });
}

