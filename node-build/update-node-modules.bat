set PACKAGE_LAST=package.json.last
if exist %PACKAGE_LAST% ( del /Q %PACKAGE_LAST% || (echo cannot delete %PACKAGE_LAST%& exit /B 1) )
call npm update || (echo npm update failed& exit /B 1)
copy package.json %PACKAGE_LAST% /Y || (echo cannot copy package.json to %PACKAGE_LAST%& exit /B 1)
@echo node modules updated& exit /B 0