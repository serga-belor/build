#!/bin/bash
if git -C ./build pull \
   && git -C ./http-server pull \
   && git -C ./labirinth pull ; then
	echo git pull succedded
else
	echo !!! git pull failed
fi
