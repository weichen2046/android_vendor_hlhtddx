# Print a list of the modules that could be built

MODULE_DEPS_JSON := $(PRODUCT_OUT)/module-deps.json

$(MODULE_DEPS_JSON):
	@echo Generating $@
	$(hide) echo -ne '{\n ' > $@
	$(hide) echo -ne $(foreach m, $(sort $(ALL_DEPS.MODULES)), \
		' "$(m)": {' \
			'"deps": [$(foreach w,$(sort $(ALL_DEPS.$(m).ALL_DEPS)),"$(w)", )] ' \
			'},\n' \
	 ) | sed -e 's/, *\]/]/g' -e 's/, *\}/ }/g' -e '$$s/,$$//' >> $@
	$(hide) echo '}' >> $@


# If ONE_SHOT_MAKEFILE is set, our view of the world is smaller, so don't
# rewrite the file in that came.
ifndef ONE_SHOT_MAKEFILE
files: $(MODULE_DEPS_JSON)
endif

