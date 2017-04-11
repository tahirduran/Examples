function bezier() {

    var g = new GraphicsControl("CanvasBezier");
    g.context.lineWidth = 5;
    g.BeginFill("#fff");
    var p1 = g.AddControlPoint(80, 150);
    var p2 = g.AddControlPoint(120, 50);
    var p3 = g.AddControlPoint(230, 50);
    var p4 = g.AddControlPoint(270, 150);
    g.EndFill();

    p1.ConnectInputX("p1_bezierx");
    p1.ConnectInputY("p1_beziery");
    p2.ConnectInputX("p2_bezierx");
    p2.ConnectInputY("p2_beziery");
    p3.ConnectInputX("p3_bezierx");
    p3.ConnectInputY("p3_beziery");
    p4.ConnectInputX("p4_bezierx");
    p4.ConnectInputY("p4_beziery");

    g.context.lineWidth = 4;
    g.context.strokeStyle = "#cccccc";
    g.AddLine(p1, p2);
    g.AddLine(p2, p3);
    g.AddLine(p3, p4);
    g.context.strokeStyle = "#000";

    g.context.lineWidth = 5;
    g.AddBezier(p1, p2, p3, p4);
    g.context.lineWidth = 1;

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 18px Arial";
    var p1t = g.AddText(70, 140, "p1");
    var p2t = g.AddText(110, 40, "p2");
    var p3t = g.AddText(220, 40, "p3");
    var p4t = g.AddText(260, 140, "p4");
    p1t.points[0].AddParent(p1);
    p2t.points[0].AddParent(p2);
    p3t.points[0].AddParent(p3);
    p4t.points[0].AddParent(p4);
    g.EndFill();


    g.context.lineWidth = 1;
    g.context.strokeStyle = "#0ca500";
    g.BeginFill("#0ca500");
    var resultp1 = g.AddControlPoint(100, 100);
    var resultp2 = g.AddControlPoint(100, 100);
    var resultp3 = g.AddControlPoint(100, 100);
    resultp1.control = false;resultp2.control = false;resultp3.control = false;
    resultp1.scale = 4;resultp2.scale = 4;resultp3.scale = 4;
    g.EndFill();
    g.context.lineWidth = 3;
    g.AddLine(resultp1, resultp2);
    g.AddLine(resultp2, resultp3);

    g.context.lineWidth = 1;
    g.context.strokeStyle = "#0000a5";
    g.BeginFill("#0000a5");
    var resultmp1 = g.AddControlPoint(100, 100);
    var resultmp2 = g.AddControlPoint(100, 100);
    resultmp1.control = false;resultmp2.control = false;
    resultmp1.scale = 4;resultmp2.scale = 4;
    g.EndFill();
    g.context.lineWidth = 3;
    g.AddLine(resultmp1, resultmp2);

    g.context.lineWidth = 1;
    g.context.strokeStyle = "#a31515";
    g.BeginFill("#a31515");
    var resultp = g.AddControlPoint(100, 100);
    resultp.control = false;
    g.EndFill();


    g.LayerRefresh([p1, p2, p3, p4, resultp]);

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 14px Arial";
    var resultt = g.AddText(95, 90, "R");
    resultt.points[0].AddParent(resultp);
    g.EndFill();

    g.BeginFill("#2ba4d5");
    g.context.font = "Bold 11px Arial";
    var p1v = g.AddText(80, 170, "(2,2)");
    var p2v = g.AddText(120, 70, "(2,2)");
    var p3v = g.AddText(230, 70, "(2,2)");
    var p4v = g.AddText(270, 170, "(2,2)");
    var resultv = g.AddText(100, 120, "(2,2)");
    p1v.points[0].AddParent(p1);
    p2v.points[0].AddParent(p2);
    p3v.points[0].AddParent(p3);
    p4v.points[0].AddParent(p4);
    resultv.points[0].AddParent(resultp);
    g.EndFill();


    function Lineer(p1, p2, deger) {
        return {
            x: (p1.x + ((p2.x - p1.x) * deger)),
            y: (p1.y + ((p2.y - p1.y) * deger))
        };
    }

    function valueChange() {
        var r = Lineer({x: p1.x, y: p1.y}, {x: p2.x, y: p2.y}, document.getElementById("deger_bezier").value);
        resultp1.Move(r.x, r.y);
        r = Lineer({x: p2.x, y: p2.y}, {x: p3.x, y: p3.y}, document.getElementById("deger_bezier").value);
        resultp2.Move(r.x, r.y);
        r = Lineer({x: p3.x, y: p3.y}, {x: p4.x, y: p4.y}, document.getElementById("deger_bezier").value);
        resultp3.Move(r.x, r.y);

        r = Lineer({x: resultp1.x, y: resultp1.y}, {x: resultp2.x, y: resultp2.y}, document.getElementById("deger_bezier").value);
        resultmp1.Move(r.x, r.y);
        r = Lineer({x: resultp2.x, y: resultp2.y}, {x: resultp3.x, y: resultp3.y}, document.getElementById("deger_bezier").value);
        resultmp2.Move(r.x, r.y);

        r = Lineer({x: resultmp1.x, y: resultmp1.y}, {x: resultmp2.x, y: resultmp2.y}, document.getElementById("deger_bezier").value);
        resultp.Move(r.x, r.y);

        document.getElementById("degery_bezier").value = document.getElementById("deger_bezier").value;
        resultv.text = "(" + Math.round(r.x) + "," + Math.round(r.y) + ")";
        p1v.text = "(" + Math.round(p1.x) + "," + Math.round(p1.y) + ")";
        p2v.text = "(" + Math.round(p2.x) + "," + Math.round(p2.y) + ")";
        p3v.text = "(" + Math.round(p3.x) + "," + Math.round(p3.y) + ")";
        p4v.text = "(" + Math.round(p4.x) + "," + Math.round(p4.y) + ")";
        g.Draw();
    }

    document.getElementById("deger_bezier").addEventListener('change', valueChange, false);
    document.getElementById("deger_bezier").addEventListener('keyup', valueChange, false);
    document.getElementById("deger_bezier").addEventListener('input', valueChange, false);
    function valueChangeY() {
        document.getElementById("deger_bezier").value = document.getElementById("degery_bezier").value;
        valueChange();
    }

    document.getElementById("degery_bezier").addEventListener('change', valueChangeY, false);
    document.getElementById("degery_bezier").addEventListener('keyup', valueChangeY, false);
    document.getElementById("degery_bezier").addEventListener('input', valueChangeY, false);
    p1.on("move", valueChange);
    p2.on("move", valueChange);
    p3.on("move", valueChange);
    p4.on("move", valueChange);
    valueChange();

}
bezier();
