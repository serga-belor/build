set PACKAGE_STAMP=package.json.stamp
if exist %PACKAGE_STAMP% ( del /Q %PACKAGE_STAMP% || (echo cannot delete %PACKAGE_STAMP%& exit /B 1) )
call npm update || (echo npm update failed& exit /B 1)
copy package.json %PACKAGE_STAMP% /Y || (echo cannot copy package.json to %PACKAGE_STAMP%& exit /B 1)
@echo node modules updated& exit /B 0