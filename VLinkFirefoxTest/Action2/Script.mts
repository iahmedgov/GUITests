
	

SystemUtil.CloseProcessByName "iexplore.exe"
systemutil.Run "iexplore.exe","https://dev-algorithm.govolution.com/vlinktest/QA/version_2_0/authcap.html"
wait(4)

'Updated by test maintenance run
'Browser("Certificate Error: Navigation Blocked").Page("Certificate Error: Navigation Blocked").Link("Continue to this website \(not recommended\)\.").Click
Browser("Certificate Error: Navigation Blocked").Page("Certificate Error: Navigation Blocked").Link("Continue to this website (not recommended).").Click
'Updated by test maintenance run
'Browser("Certificate Error: Navigation").Page("V-Link Test").WebEdit("remittance_id").Set "gt345gsdff5t4fd6"
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("remittance_id").Set "gt345gsdff5t4fd7"
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("application_id").Set "234"
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("amount").Set "10.00"
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("card_exyr").Set "2017"
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("track_data").Set ""
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("email").Set ""
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("order_number").Set ""
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebEdit("user_defined1").Set ""
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test").WebButton("Process V-Link Transaction").Click
wait(5)


Browser("Certificate Error: Navigation Blocked").WinObject("Notification").WinButton("WinButton").Click
wait(3)

Browser("Certificate Error: Navigation Blocked").WinMenu("ContextMenu").Select "Save as"
wait(3)

Browser("Certificate Error: Navigation Blocked").Dialog("Save As").WinEdit("File name:").Set "c:\ResFile\abc.txt"
Browser("Certificate Error: Navigation Blocked").Dialog("Save As").WinButton("Save").Click
wait(3)

Dim useRemID
	useRemID = getTranxID()

If not isnull(useRemID) Then
	
	'Use the TranxID to void the Sale transaction
	msgbox "useRemID: "& useRemID
	SystemUtil.CloseProcessByName "iexplore.exe"
	systemutil.Run "iexplore.exe","https://dev-algorithm.govolution.com/vlinktest/QA/version_2_0/CC_void.html"
	wait(4)
	
Browser("Certificate Error: Navigation Blocked").Page("Certificate Error: Navigation Blocked").Link("Continue to this website (not recommended).").Click @@ hightlight id_;_Browser("Certificate Error: Navigation Blocked").Page("Certificate Error: Navigation Blocked").Link("Continue to this website (not recommended).")_;_script infofile_;_ZIP::ssf2.xml_;_
wait(4)
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test_2").WebEdit("remittance_id").Set "gtttyyyhhhh123" @@ hightlight id_;_Browser("Certificate Error: Navigation Blocked").Page("V-Link Test 2").WebEdit("remittance id")_;_script infofile_;_ZIP::ssf3.xml_;_
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test_2").WebEdit("application_id").Set "234" @@ hightlight id_;_Browser("Certificate Error: Navigation Blocked").Page("V-Link Test 2").WebEdit("application id")_;_script infofile_;_ZIP::ssf4.xml_;_
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test_2").WebEdit("transaction_id").Set useRemID @@ hightlight id_;_Browser("Certificate Error: Navigation Blocked").Page("V-Link Test 2").WebEdit("transaction id")_;_script infofile_;_ZIP::ssf5.xml_;_
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test_2").WebEdit("original_transaction_type").Set "104" @@ hightlight id_;_Browser("Certificate Error: Navigation Blocked").Page("V-Link Test 2").WebEdit("original transaction type")_;_script infofile_;_ZIP::ssf6.xml_;_
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test_2").WebEdit("track_data").Set "" @@ hightlight id_;_Browser("Certificate Error: Navigation Blocked").Page("V-Link Test 2").WebEdit("track data")_;_script infofile_;_ZIP::ssf7.xml_;_
Browser("Certificate Error: Navigation Blocked").Page("V-Link Test_2").WebButton("Process V-Link Transaction").Click @@ hightlight id_;_Browser("Certificate Error: Navigation Blocked").Page("V-Link Test 2").WebButton("Process V-Link Transaction")_;_script infofile_;_ZIP::ssf8.xml_;_
wait (5)
Browser("Certificate Error: Navigation Blocked").WinObject("Notification").WinButton("WinButton").Click
wait(3)

Browser("Certificate Error: Navigation Blocked").WinMenu("ContextMenu").Select "Save as"
wait(3)

Browser("Certificate Error: Navigation Blocked").Dialog("Save As").WinEdit("File name:").Set "c:\ResFile\abc.txt"
Browser("Certificate Error: Navigation Blocked").Dialog("Save As").WinButton("Save").Click
wait(3)
Call verifyResult()
	
else
	Reporter.ReportEvent micFail, "Sale Transaction Failed", "Not attemptin Void transaction"
End If





Function getTranxID()
	Dim myfso1, myfsofile1

' Create a File System Object
	set myfso1 = createobject("Scripting.FileSystemObject")
' Open the saved text file in read mode
	Set myfsofile1 = myfso1.OpenTextFile("c:\ResFile\abc.txt",1,True)

' Declare the variables
	Dim actual, baseline, compare
	Dim textin, getRemID
'	Dim k
'	Dim str(10)
'	k = 0

' Loop through the text file to read each line
	Do while myfsofile1.AtEndOfStream <> True
'		str(k) = myfsofile1.Readline
		textin = myfsofile1.Readline
'		msgbox str(k)
		'msgbox textin
'		actual = str(k)
		actual = textin
		'msgbox actual
		baseline = "Transaction approved, no errors"
	' Compare the actual text of the text file with the baseline
		compare = InStr(1,actual,baseline,1)
		'msgbox compare

		If compare <> 0 and compare <> "NULL" Then
			'msgbox "Pass"
	' Write Pass in the Result column in dsaleccerr datasheet
'			datatable.Value("Result","dsaleccerr") = "Pass"
			Reporter.ReportEvent micPass, "Comparing Baseline with Actual", "Comparison has Passed"
			remID = Mid(actual,36,8)
			'msgbox "remID: " & remID
			If not isnull(remID) Then
				getTranxID = remID
				Reporter.ReportEvent micPass, "Sale Transaction was successfull. Transaction ID: " & remID, "Use this to Void this transaction"
			End If
			' Void this Sale transaction now
			
		else 
			'msgbox "Fail"
'			 Write Pass in the Result column in dsaleccerr datasheet
			'datatable.Value("Result","dsaleccerr") = "Fail"
			Reporter.ReportEvent micFail, "Comparing Baseline with Actual", "Comparison has Failed" & actual
			'msgbox "Check if Fail is written in the Result column"
			getTranxID = null
		End If
'	k = k+1


	Loop

' Close the text file
	myfsofile1.Close

' Delete the text file
myfso1.DeleteFile("c:\ResFile\abc.txt")
End Function


Function verifyResult()
	
	Dim myfso1, myfsofile1

' Create a File System Object
	set myfso1 = createobject("Scripting.FileSystemObject")
' Open the saved text file in read mode
	Set myfsofile1 = myfso1.OpenTextFile("c:\ResFile\abc.txt",1,True)

' Declare the variables
	Dim actual, baseline, compare
	Dim textin, getRemID
'	Dim k
'	Dim str(10)
'	k = 0

' Loop through the text file to read each line
	Do while myfsofile1.AtEndOfStream <> True
'		str(k) = myfsofile1.Readline
		textin = myfsofile1.Readline
'		msgbox str(k)
		'msgbox textin
'		actual = str(k)
		actual = textin
		'msgbox actual
		baseline = "Transaction approved, no errors"
	' Compare the actual text of the text file with the baseline
		compare = InStr(1,actual,baseline,1)
		'msgbox compare

		If compare <> 0 and compare <> "NULL" Then
			'msgbox "Pass"
	' Write Pass in the Result column in dsaleccerr datasheet
'			datatable.Value("Result","dsaleccerr") = "Pass"
			Reporter.ReportEvent micPass, "Comparing Baseline with Actual", "Comparison has Passed"
'			remID = Mid(actual,36,8)
'			'msgbox "remID: " & remID
'			If not isnull(remID) Then
'				Reporter.ReportEvent micPass, "Sale Transaction was successfull. Transaction ID: " & remID, "Use this to Void this transaction"
'			End If
			' Void this Sale transaction now
			
		else 
			'msgbox "Fail"
'			 Write Pass in the Result column in dsaleccerr datasheet
			'datatable.Value("Result","dsaleccerr") = "Fail"
			Reporter.ReportEvent micFail, "Comparing Baseline with Actual", "Comparison has Failed" & actual
			'msgbox "Check if Fail is written in the Result column"
		End If
'	k = k+1


	Loop

' Close the text file
	myfsofile1.Close

' Delete the text file
myfso1.DeleteFile("c:\ResFile\abc.txt")
End Function


SystemUtil.CloseProcessByName "iexplore.exe"

