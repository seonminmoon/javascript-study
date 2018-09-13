

//----------------------------------------------------------주소록 스크립트 시작(버튼,select)

var getComboList = function() {
	var rs = [];
	$.ajax({
		type : 'GET',
	    dataType : 'json',
	    async : false, // 동기식으로 처리
		url: '/data/deptCode.json',
	    success : function(data) {
	    		console.log(data.LIST);
	    		rs = data.LIST;
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
				console.log("jqXHR", jqXHR);
				console.log("textStatus", textStatus);
				console.log("errorThrown", errorThrown);
	        }
	});
	return rs;
}
var gvComboList = getComboList();


$('#btn-add').click(function() {
	var oTbody = $('#oTbody');
	
	var oTd1 = $('<td>');
    var oTd2 = $('<td>');
    var oTd3 = $('<td>');
    var oTd4 = $('<td>');
    var oTd5 = $('<td>');
	var oRadio = []; // radio box
    oRadio[0] = $('<input type="radio"/>').prop({name:"telRadio", value:"SKT_phone"});
    oRadio[1] = $('<input type="radio"/>').prop({name:"telRadio", value:"LG_U+"});

	
    var oCombo = $('<select/>'); // combo box
    $.each(gvComboList, function(idx, item) {
    	oCombo.append($('<option>').prop({value: item.code, text: item.desc}));
    });
    
    var oAnchor = []; // a
    oAnchor[0] = $('<a>').prop({href:"https://www.naver.com/", text:"네이버"});
    oAnchor[1] = $('<a>').prop({href:"https://www.google.com/", text:"google"});
    
    var oImg = [];
    oImg[0] = $('<img id="img1" class="imgs">').attr({src:"/images/img.jpg"});
    oImg[1] = $('<img id="img2" class="imgs">').attr({src:"/images/img2.jpg"});
    
    var oAnchor_01 = $('')
    oTd1.append(oRadio[0]).append("SKT").append(oRadio[1]).append("LG"); // radio box
    oTd2.append($('<input type="text" id="textId">')); // text
    oTd3.append(oCombo); // combo box
    oTd4.append(oImg); // image 
    oTd5.append(oAnchor); // a
     	
    var oTr = $('<tr>');
    oTr.append(oTd1).append(oTd2).append(oTd3).append(oTd4).append(oTd5);
    oTbody.append(oTr);
    
    // text event
    $("#textId").blur(function() {
    	alert($("#textId").val() + "를 입력하셨습니다");
    	$("#textId").val("");	
    });
    // img event
    $(".imgs").on("click", function(e){
    	$("#img1").attr("src", function(index, attr) {
	    	if (attr.match('/images/img.jpg')) {
	    		return attr.replace('/images/img.jpg', '/images/img2.jpg');
	    	} else {
	    		return attr.replace('/images/img2.jpg', '/images/img.jpg');
	    	}
    	});
    	$("#img2").attr("src", function(index, attr) {
	    	if (attr.match('/images/img.jpg')) {
	    		return attr.replace('/images/img.jpg', '/images/img2.jpg');
	    	} else {
	    		return attr.replace('/images/img2.jpg', '/images/img.jpg');
	    	}
    	});
    });

    // radio event
    $("input[name=telRadio]").change(function() {
    	alert($(this).val() + "를 선택하셨습니다.");
    });
    
    
    var aTr = $('#addrBook tr'); // tr array
    // select event
    $(oCombo).change(function(e) {
    	var selectedText = $(this).find('option:selected').text();
    	$.each(aTr, function(idx, oTr) {
    		var deptNm = $(oTr).find('td').eq(2).text();
    		if(selectedText === deptNm) {
    			var empNm = $(oTr).find('td').eq(1).text();
    			alert(empNm + "님의 부서를 선택하셨습니다.");
    			return false;
    		}
    	});
    	
	    	
    	/*if ($(this).find('option:selected').text() == '영업1팀') {
    		alert($("#addrBook").find('tr:eq(3)').find('td').eq(1).text() + " 을 선택하셨습니다.");
    	} else if($(this).find('option:selected').text() == '인사팀') {
    		alert($("#addrBook").find('tr:eq(1)').find('td').eq(1).text() + " 를 선택하셨습니다.");
    	} else if($(this).find('option:selected').text() == '회계팀') {
    		alert($("#addrBook").find('tr:eq(2)').find('td').eq(1).text() + " 를 선택하셨습니다.");
    	} else if($(this).find('option:selected').text() == '영업2팀') {
    		alert($("#addrBook").find('tr:eq(5)').find('td').eq(1).text() + " 를 선택하셨습니다.");
    	} else if($(this).find('option:selected').text() == '개발1팀') {
    		alert($("#addrBook").find('tr:eq(4)').find('td').eq(1).text() + " 를 선택하셨습니다.");
    	} else {
    		alert("해당 이름이 없습니다.");
    	}*/
    	
    	//alert(e.target.selectedOptions[0].text + " 를 선택하셨습니다.");
    	// alert($(this).find('option:selected').text() + " 를 선택하셨습니다.");
    });
        	
});

$('#btn-remove').click(function() {
	$('#addrBook > tbody:last > tr:last').remove();
});

$('#btn-save').click(function() {
	$('#addrBookSave > tbody:last').append('<tr>' +
	'<td>입력</td><td>입력</td><td>입력</td><td>입력</td><td>입력</td>' + '</tr>');
});



//--------------------------------------------------------------json data list 불러오기
$.ajax({
	type : 'GET',
    dataType : 'json',
	url: '/data/empMock.json',
    success : function(data) {
		// debugger;
        console.log(data.RST_DATA); 
		//var oTable = $('#addrBookSave'); // 테이블
		var oTbody = $('#oTbody'); // tbody
        var aList = data.RST_DATA;
		
        $.each(aList, function(idx, oRow) {
        	var oTd1 = $('<td>');
        	var oTd2 = $('<td>');
        	var oTd3 = $('<td>');
        	var oTd4 = $('<td>');
        	var oTd5 = $('<td>');
        	
        	oTd1.text(oRow.empno);//oTd1.text(oRow['empno']);
        	oTd2.text(oRow.empnm);//oTd1.text(oRow['empnm']);
        	oTd3.text(getDesc(oRow.deptcd));//oTd1.text(oRow['deptcd']);
        	oTd4.text(oRow.tel);//oTd1.text(oRow['tel']);
        	oTd5.text(oRow.memo);//oTd1.text(oRow['memo']);
        	
        	var oTr = $('<tr>');
        	oTr.append(oTd1).append(oTd2).append(oTd3).append(oTd4).append(oTd5);
        	oTbody.append(oTr);
        	
        });
        /* 
        var t = document.getElementById()
        
        for(var i=0; i<=data.RST_DATA.length; i++) {
		$('#addrBook > tbody:last').append('<tr><td>'
			+ data.RST_DATA[i].empno +'</td><td>'
    		+ data.RST_DATA[i].empnm +'</td><td>'
    		+ data.RST_DATA[i].deptcd +'</td><td>'
    		+ data.RST_DATA[i].tel +'</td><td>'
    		+ data.RST_DATA[i].memo +'</td>' + '</tr>');
        } */
    },
    error : function(jqXHR, textStatus, errorThrown) {
		console.log("jqXHR", jqXHR);
		console.log("textStatus", textStatus);
		console.log("errorThrown", errorThrown);
    }
});

function getDesc(inputCode) {
	var desc;
	// debugger;
	$.each(gvComboList, function(idx, item) {
		if (item.code == inputCode) {
			desc = item.desc;
			return false; // 무한 루프를 막기 위함
		}
	});
	
	return desc;
}
