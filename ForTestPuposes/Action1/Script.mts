''
Option Explicit

'On Error GoTo 0 

Dim mycn, myrs, rn
Dim RecordNumber, UserID, Password, URL, Title, Environment, TestType, Product, AddressID, SearchVPOSID, AuthCapID, VerificationPointID, VirtualFlowID, numOfRows, i
Dim UIQuery
Dim sql
Dim TestHarnessID, PaymentMethodID, PayByCCID
Dim ssPath

	ssPath = ssCreateFolder()
'	msgbox "ssPath: " & ssPath

UIQuery = UserInterface()

' Check if Query is not Null
If IsNull(UIQuery)  Then
	Msgbox "Invalid input from the User Interface.  Please Re-Execute"

' Else of Check if Query is not Null	
Else
msgbox "UIQuery: "& UIQuery

Reporter.ReportEvent 0, "The following Query will be Executed:  " & UIQuery, "Test Execution Information"
'Dim var
' var = SelectVirtualFlow()


 'Creates a database connection object
Set mycn = createobject("ADODB.Connection")
mycn.Open "Provider=Microsoft.jet.oledb.4.0;data source=C:\TestAssets\QTP\DB\db1.mdb"


'sql = "SELECT * FROM MainTable where Product = 'Vrelay' "
sql = UIQuery


set myrs = createobject("ADODB.Recordset")
myrs.Open sql,mycn
msgbox myrs.EOF

' Check if Query did not return anything
If Not(myrs.EOF) Then

numOfRows = db_get_rows_count(myrs)
msgbox numOfRows

Reporter.ReportEvent 0, "There are " &numOfRows& " Records in the Main Table. ", "Test Execution Information"



myrs.Movefirst
Do while NOT myrs.EOF
	RecordNumber =  myrs("RecordNumber")
	UserID =  myrs("UserID")
	Password = myrs("Password")
	URL =  myrs("URL")
	Title =  myrs("Title")
	Environment =  myrs("Environment")
	TestType =  myrs("TestType")
	Product =  myrs("Product")
	AddressID =  myrs("AddressID")
	SearchVPOSID =  myrs("VPO_SearchVPOSID")
	AuthCapID =  myrs("VPO_AuthCapID")
	TestHarnessID = myrs("VRE_TestHarnessID")
	PaymentMethodID = myrs("VRE_PaymentMethodID")
	PayByCCID = myrs("VRE_PayByCCID")
	VerificationPointID =  myrs("VerificationPointID")
	VirtualFlowID =  myrs("VirtualFlowID")

	rn = RecordNumber
'	msgbox rn




Reporter.ReportEvent 0, "Executing Record Number " &rn& " from the Main Table", "Test Execution Information"



'msgbox "Inside Test: " & ftpBatchID
' or (Not IsNull(VirtualFlowID))
If Not IsNull(URL) and Not IsNull(VirtualFlowID) Then

		If SelectVirtualFlow (mycn,myrs) = Fail then
				Reporter.ReportEvent 1, "SelectVirtualFlow Function failed.  Unable to continue execution for this Record "&rn , "Test Execution Information"
				vstResult = "Fail"
'				vstErro = "Error # " & CStr(Err.Number) & " " & Err.Description
				Call CaptureSS(ssPath,rn)
				Call InsertIntoTestResult(mycn, myrs, vstResult, vstErro)
				Call CloseBrowser()
		End If

else
				msgbox "came here"
				Reporter.ReportEvent 1, "Either URL or Virtual Flow data is missing from the MainTable.  Unable to continue execution for this Record "&rn , "Test Execution Information"
				vstResult = "Fail"
				vstErro = "Either URL or Virtual Flow data is missing from the MainTable"
				Call InsertIntoTestResult(mycn, myrs, vstResult, vstErro)

End If

'Call AuthCapSetData (rn)


myrs.MoveNext
Loop

myrs.Close

mycn.Close

Set myrs = nothing

Set mycn = nothing

Set ftpBatchID = nothing



' Else of if Query did not return anything
else
		MsgBox "Query did not return any Data Set.  Please Re-Execute"

' End of if Query did not return anything
End if


' End of Check if Query is not Null
End If

Function db_get_rows_count( byRef curRS ) 

       dim rows 

       rows = 0 

If Not(curRS.EOF) Then
		   curRS.MoveFirst 
	
		   Do Until curRS.EOF 
	
				  rows = rows+1 
	
				  curRS.MoveNext 
	
		   Loop 
	
End If
	   db_get_rows_count = rows 

End Function 




















































































