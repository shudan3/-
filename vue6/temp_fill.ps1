$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = [Microsoft.Office.Interop.Word.WdAlertLevel]::wdAlertsNone
$word.AutomationSecurity = 1

$doc = $word.Documents.Open("D:\软件下载位置\工科院软件\VUE前端期末\202539190373+舒丹+《前端框架技术》期末考查报告.doc", $false, $true, $false)

$t1 = $doc.Tables[1]
$t1.Cell(4,2).Range.Text = "2025级6班（专升本）"
$t1.Cell(5,2).Range.Text = "202539190373"
$t1.Cell(6,2).Range.Text = "舒丹"
$t1.Cell(7,2).Range.Text = "Vue3 简易电商商城网站"

$t3 = $doc.Tables[3]
$t3.Cell(1,2).Range.Text = "Vue3 简易电商商城网站"
$t3.Cell(2,2).Range.Text = "本项目基于 uni-app + Vue3 开发，实现移动端电商商城功能。"

$savePath = "D:\软件下载位置\工科院软件\VUE前端期末\202539190373+舒丹+《前端框架技术》期末考查报告.doc"
$doc.SaveAs($savePath)
$doc.Close()
$word.Quit()
Write-Output "OK"
