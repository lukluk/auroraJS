function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function minInput(sel,parent,klass,after,newtype){
		if(typeof newtype != 'undefined')
		sel.attr('type',newtype);
		sel.before('<'+parent+' class="'+klass+'" id="x123"></'+parent+'>');		
		var f=$(parent+'#x123');
		sel.appendTo(f);
		sel.after(after);
		f.removeAttr("id");		
		if(typeof sel.attr('name') != 'undefined')
		window[sel.attr('name')] =sel;
		sel.attr('placeholder',sel.attr('label'));

} 
$(function(){
	$('input[type=text],input[type=email],textarea,input[type=search]').each(function(){		
		minInput($(this),'p','','');
	});
	$('input[type=email]').blur(function(){
		if(validateEmail($(this).val() ))
		{
			$(this).parent().removeClass('invalid');			
			$(this).parent().addClass('valid');
		}else
		{
			$(this).parent().removeClass('valid');						
			$(this).parent().addClass('invalid');
		}
	});
	$('input[type=password],input.required').blur(function(){
		if( $(this).val() !='' )
		{
			$(this).parent().removeClass('invalid');			
			$(this).parent().addClass('valid');
		}else
		{
			$(this).parent().removeClass('valid');						
			$(this).parent().addClass('invalid');
		}
	});
	//checkbox
	$('input[type=checkbox]').each(function(){		
		minInput($(this),'label','option','<span class="checkbox"></span>');
	});
	//radio
	$('input[type=radio]').each(function(){		
		minInput($(this),'label','option','<span class="radio"></span>');
	});
	$('input[type=switch]').each(function(){		
		var color='switch-'+$(this).attr('color');
		var model='switch-'+$(this).attr('model');
		var on=$(this).attr('data-on');
		var off=$(this).attr('data-off');
		if($(this).val()=='')
		{
			if(model=='')
			{
				on='ON';
				off='OFF';
			}else
			{
				on='I';
				off='O';

			}
		}
		minInput($(this),'span','switch '+color+' '+model,'<label for="'+$(this).attr('id')+'" data-on="'+on+'" data-off="'+off+'"></label>','checkbox');		
	});
	$('div.tooltip').each(function(){		
		if($(this).attr('model')!='')
		$(this).addClass('tooltip-'+$(this).attr('model'));
		$('<p>'+$(this).html()+'</p>').appendTo($(this));
	});
	$('select').each(function(){		
		minInput($(this),'div','select','','');
	});
	$('div.progress').each(function(){		
		if($(this).attr('model')!='')
		$(this).addClass('progress-'+$(this).attr('model'));
		if($(this).attr('color')!='')
		$(this).addClass('progress-'+$(this).attr('color'));

		$('<span style="width:'+$(this).attr('value')+'%"></span>').appendTo($(this));
		
	});
	$('table thead').addClass('table-head');
	$('table tfoot').addClass('table-foot');
	$('table tbody').addClass('table-body');
	$('input[type=submit]').each(function(){
		$(this).addClass('button');
		if($(this).attr('model')!='')
		$(this).addClass('button-'+$(this).attr('model'));
		if($(this).attr('color')!='')
		$(this).addClass('button-'+$(this).attr('color'));

	});
	$('div.button-group a').addClass('button');
	$('div.button-dropdown a').addClass('button');
	$('div.heading').each(function(){
        $('<h2>'+$(this).attr('title')+'</h2>').appendTo($(this));
        $(this).find('ul').addClass('heading-links');
	});
	$('p.alert').each(function(){
		if($(this).attr('model')!='')
		$(this).addClass(''+$(this).attr('model'));
		$('<a href="#" class="alert-close">x</a>').appendTo($(this));

	});
});
